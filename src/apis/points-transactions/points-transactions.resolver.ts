import { Args, Context, Int, Mutation, Resolver } from '@nestjs/graphql';
import { PointsTransactionsService } from './points-transactions.service';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guards/graphql-auth.guard';
import { PointTransaction } from './entities/pointTransaction.entity';

import { IContext } from '../commons/interfaces/context';
import {
  CancelPointTransactionInput,
  CancelPointTransactionOutput,
} from './dto/cancel-pointTransaction.dto';
import {
  CreateForPaymentInput,
  CreateForPaymentOutput,
} from './dto/create-pointTransaction.dto';

@Resolver()
export class PointsTransactionsResolver {
  constructor(
    private readonly pointsTransactionsService: PointsTransactionsService,
  ) {}

  @UseGuards(GqlAuthGuard('access'))
  @Mutation(() => CreateForPaymentOutput)
  createPointTransaction(
    @Args('input') createForPaymentInput: CreateForPaymentInput,
    @Context() context: IContext,
  ): Promise<CreateForPaymentOutput> {
    const user = context.req.user;
    return this.pointsTransactionsService.createForPayment(
      createForPaymentInput,
      {
        user,
      },
    );
  }

  @UseGuards(GqlAuthGuard('access'))
  @Mutation(() => PointTransaction)
  cancelPointTransaction(
    @Args('input') cancelPointTransactionInput: CancelPointTransactionInput,
    @Context() context: IContext,
  ) {
    const user = context.req.user;
    return this.pointsTransactionsService.cancelPointTransaction(
      cancelPointTransactionInput,
      {
        user,
      },
    );
  }
  // @UseGuards(GqlAuthGuard('access'))
  // @Mutation(() => PointTransaction)
  // createPointTransaction(
  //   @Args('impUid') impUid: string, //
  //   @Args({ name: 'amount', type: () => Int }) amount: number,
  //   @Context() context: IContext,
  // ): Promise<PointTransaction> {
  //   const user = context.req.user;
  //   return this.pointsTransactionsService.create({ impUid, amount, user });
  // }
}
