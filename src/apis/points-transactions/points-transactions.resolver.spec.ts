import { Test, TestingModule } from '@nestjs/testing';
import { PointsTransactionsResolver } from './points-transactions.resolver';

describe('PointsTransactionsResolver', () => {
  let resolver: PointsTransactionsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PointsTransactionsResolver],
    }).compile();

    resolver = module.get<PointsTransactionsResolver>(PointsTransactionsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
