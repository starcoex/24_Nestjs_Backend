import {
  ConflictException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

import {
  CreateForPaymentInput,
  CreateForPaymentOutput,
} from './dto/create-pointTransaction.dto';
import {
  PointTransaction,
  POINT_TRANSACTION_STATUS_ENUM,
} from './entities/pointTransaction.entity';
import { IAuthUser } from '../commons/interfaces/context';
import { PortOneService } from '../portone/portone.service';
import {
  IPointsTransactionsServiceCheckAlreadyCanceled,
  IPointsTransactionsServiceCheckDuplication,
  IPointsTransactionsServiceCheckHasCancelablePoint,
  IPointsTransactionsServiceCreate,
  IPointsTransactionsServiceFindByImpUidAndUser,
  IPointsTransactionsServiceFindOneByImpUid,
} from './interfaces/points-transactions-service.interface';
import {
  CancelPointTransactionInput,
  CancelPointTransactionOutput,
} from './dto/cancel-pointTransaction.dto';

@Injectable()
export class PointsTransactionsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly portOneService: PortOneService,
  ) {}

  async create({
    impUid,
    amount,
    status = POINT_TRANSACTION_STATUS_ENUM.Payment,
    user: _user,
  }: IPointsTransactionsServiceCreate) {
    return this.prisma.$transaction(async (tx) => {
      const pointTransaction = await tx.portOne.create({
        data: {
          impUid,
          amount,
          status,
          user: { connect: { id: _user.id } },
        },
      });
      const user = await tx.user.findUnique({ where: { id: _user.id } });
      const userPointUpdate = await tx.user.update({
        where: { id: user.id },
        data: { point: user.point + amount },
      });
      return pointTransaction;
    });
  }

  // async create({
  //   impUid,
  //   amount,
  //   status = POINT_TRANSACTION_STATUS_ENUM.Payment,
  //   user: _user,
  // }: IPointsTransactionsServiceCreate) {
  //   const pointTransaction = await this.prisma.portOne.create({
  //     data: {
  //       impUid,
  //       amount,
  //       status,
  //       user: { connect: { id: _user.id } },
  //     },
  //   });
  //   const user = await this.prisma.user.findUnique({ where: { id: _user.id } });
  //   await this.prisma.user.update({
  //     where: { id: user.id },
  //     data: { point: user.point + amount },
  //   });
  //   return pointTransaction;
  // }

  async findOneByImpUid({ impUid }: IPointsTransactionsServiceFindOneByImpUid) {
    const portOne = await this.prisma.portOne.findFirst({ where: { impUid } });
    return portOne;
  }

  async checkDuplication({
    impUid,
  }: IPointsTransactionsServiceCheckDuplication): Promise<void> {
    const result = await this.findOneByImpUid({ impUid });
    if (result) {
      throw new ConflictException('이미 등록된 결제 아이디입니다.');
    }
  }

  async createForPayment(
    createForPaymentInput: CreateForPaymentInput,
    { user: _user }: IAuthUser,
  ): Promise<CreateForPaymentOutput> {
    try {
      const { impUid, amount, status } = createForPaymentInput;
      await this.portOneService.checkPaid({ impUid, amount });
      await this.checkDuplication({ impUid });
      const { id } = _user;
      const transactionPoint = await this.create({
        impUid,
        amount,
        user: _user,
        status,
      });
      // const transactionPoints = await this.prisma.$transaction(async (tx) => {
      //   const pointTransaction = await tx.portOne.create({
      //     data: {
      //       impUid,
      //       amount,
      //       status: POINT_TRANSACTION_STATUS_ENUM.Cancel,
      //       user: { connect: { id } },
      //     },
      //   });
      //   const user = await tx.user.findUnique({ where: { id } });
      //   const userPointUpdate = await tx.user.update({
      //     where: { id: user.id },
      //     data: { point: user.point + amount },
      //   });
      //   return { userPointUpdate, pointTransaction };
      // });

      // const pointTransaction = await this.prisma.portOne.create({
      //   data: {
      //     impUid,
      //     amount,
      //     status: POINT_TRANSACTION_STATUS_ENUM.Paid,
      //     user: { connect: { id } },
      //   },
      // });
      // const user = await this.prisma.user.findUnique({ where: { id } });
      // await this.prisma.user.update({
      //   where: { id: user.id },
      //   data: { point: user.point + amount },
      // });

      // return {
      //   ok: true,
      //   id: pointTransaction.id,
      //   pointTransaction: pointTransaction as PointTransaction,
      // };
      // return {
      //   ok: true,
      //   id: transactionPoints.pointTransaction.id,
      //   pointTransaction:
      //     transactionPoints.pointTransaction as unknown as PointTransaction,
      // };
      return {
        ok: true,
        pointTransaction: transactionPoint as PointTransaction,
      };
    } catch (error) {
      console.error('Transaction failed:', error.message);
    } finally {
      await this.prisma.$disconnect();
    }
  }

  // async create({
  //   impUid,
  //   amount,
  //   user: _user,
  // }: IPointsTransactionsServiceCreate): Promise<PointTransaction> {
  //   const pointTransaction = await this.prisma.portOne.create({
  //     data: {
  //       impUid,
  //       amount,
  //       status: POINT_TRANSACTION_STATUS_ENUM.Paid,
  //       user: { connect: { id: _user.id } },
  //     },
  //   });
  //   const user = await this.prisma.user.findUnique({ where: { id: _user.id } });
  //   await this.prisma.user.update({
  //     where: { id: user.id },
  //     data: { point: user.point + amount },
  //   });

  //   return pointTransaction as PointTransaction;

  //   return {
  //     ok: true,
  //     pointTransaction:
  //       transactionPoints.pointTransaction as unknown as PointTransaction,
  //   };
  // }

  async findByImpUidAndUser({
    impUid,
    user,
  }: IPointsTransactionsServiceFindByImpUidAndUser) {
    const pointTransaction = await this.prisma.portOne.findMany({
      where: { impUid, user: { id: user.id } },
      include: { user: true },
    });
    return pointTransaction;
  }

  async checkAlreadyCanceled({
    pointTransactions,
  }: IPointsTransactionsServiceCheckAlreadyCanceled) {
    const canceledPointTransactions = pointTransactions.filter(
      (el) => el.status === POINT_TRANSACTION_STATUS_ENUM.Cancel,
    );
    if (canceledPointTransactions.length) {
      throw new ConflictException('이미 취소된 결제 이이디입니다.');
    }
  }

  async checkHasCancelablePoint(pointTransactions) {
    const paidPointTransactions = pointTransactions.filter(
      (el) => el.status === POINT_TRANSACTION_STATUS_ENUM.Payment,
    );
    if (!paidPointTransactions.length) {
      throw new UnprocessableEntityException('겔제 기록이 존재하지 않습니다.');
    }
    if (paidPointTransactions[0].user.point < paidPointTransactions[0].amount) {
      throw new UnprocessableEntityException('포인트가 부족합니다.');
    }
  }

  async cancelPointTransaction(
    cancelPointTransactionInput: CancelPointTransactionInput,
    { user: _user }: IAuthUser,
  ) {
    const { impUid } = cancelPointTransactionInput;
    const pointTransactions = await this.findByImpUidAndUser({
      impUid,
      user: _user,
    });
    // await this.checkAlreadyCanceled({ pointTransactions });
    const canceledPointTransactions = pointTransactions.filter(
      (el) => el.status === POINT_TRANSACTION_STATUS_ENUM.Cancel,
    );
    if (canceledPointTransactions.length)
      throw new ConflictException('이미 취소된 결제 이이디입니다.');
    const paidPointTransactions = pointTransactions.filter(
      (el) => el.status === POINT_TRANSACTION_STATUS_ENUM.Payment,
    );
    if (!paidPointTransactions.length)
      throw new UnprocessableEntityException('겔제 기록이 존재하지 않습니다.');

    if (paidPointTransactions[0].user.point < paidPointTransactions[0].amount)
      throw new UnprocessableEntityException('포인트가 부족합니다.');

    // await this.checkHasCancelablePoint(pointTransactions);

    const canceledAmount = await this.portOneService.cancel({ impUid });
    const cancelPoint = await this.create({
      impUid,
      amount: -canceledAmount,
      user: _user,
      status: POINT_TRANSACTION_STATUS_ENUM.Cancel,
    });
    // return {
    //   ok: true,
    // };
    return cancelPoint;
  }
}
