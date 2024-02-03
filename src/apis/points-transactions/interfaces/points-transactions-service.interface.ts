import { IAuthUser } from 'src/apis/commons/interfaces/context';
import {
  POINT_TRANSACTION_STATUS_ENUM,
  PointTransaction,
} from '../entities/pointTransaction.entity';
export interface IPointsTransactionsServiceCreate {
  // impUid: string;
  // createProductInput: CreatePointTransactionInput;
  user: IAuthUser['user'];
}

export interface IPointsTransactionsServiceCreateUser {
  user: IAuthUser['user'];
}

export interface IPointsTransactionsServiceCreate {
  impUid: string;
  amount: number;
  status?: POINT_TRANSACTION_STATUS_ENUM;
  user: IAuthUser['user'];
}

export interface IPointsTransactionsServiceFindOneByImpUid {
  impUid: string;
}

export interface IPointsTransactionsServiceCheckDuplication {
  impUid: string;
}

export interface IPointsTransactionsServiceFindByImpUidAndUser {
  impUid: string;
  user: IAuthUser['user'];
}

export interface IPointsTransactionsServiceCheckAlreadyCanceled {
  // pointTransactions: {
  //   user: {
  //     id: string;
  //     email: string;
  //     password: string;
  //     name: string;
  //     refreshToken: string;
  //     point: number;
  //     createdAt: Date;
  //     updatedAt: Date;
  //   };
  // } & {
  //   id: string;
  //   impUid: string;
  //   amount: number;
  //   status: POINT_TRANSACTION_STATUS_ENUM;
  //   userId: string;
  //   createdAt: Date;
  // };
  pointTransactions: PointTransaction[];
}

export interface IPointsTransactionsServiceCheckHasCancelablePoint {
  status: POINT_TRANSACTION_STATUS_ENUM;
  user: any;
  amount: any;
  pointTransactions: ({
    user: {
      id: string;
      email: string;
      password: string;
      name: string;
      refreshToken: string;
      point: number;
      createdAt: Date;
      updatedAt: Date;
    };
  } & {
    id: string;
    impUid: string;
    amount: number;
    status: POINT_TRANSACTION_STATUS_ENUM;
    userId: string;
    createdAt: Date;
  })[];
  // pointTransactions: PointTransaction[];
}

export type pointTransactions = ({
  user: {
    id: string;
    email: string;
    password: string;
    name: string;
    refreshToken: string;
    point: number;
    createdAt: Date;
    updatedAt: Date;
  };
} & {
  id: string;
  impUid: string;
  amount: number;
  status: POINT_TRANSACTION_STATUS_ENUM;
  userId: string;
  createdAt: Date;
})[];
