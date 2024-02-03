import { Module } from '@nestjs/common';
import { PointsTransactionsResolver } from './points-transactions.resolver';
import { PointsTransactionsService } from './points-transactions.service';
import { PortOneService } from '../portone/portone.service';

@Module({
  providers: [
    PointsTransactionsResolver,
    PointsTransactionsService,
    PortOneService,
  ],
})
export class PointsTransactionsModule {}
