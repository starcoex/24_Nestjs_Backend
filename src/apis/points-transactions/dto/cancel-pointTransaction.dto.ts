import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { PointTransaction } from '../entities/pointTransaction.entity';
import { CoreOutput } from 'src/apis/commons/dto/output.dto';

@InputType()
export class CancelPointTransactionInput extends PickType(
  PointTransaction,
  ['impUid'],
  InputType,
) {}

@ObjectType()
export class CancelPointTransactionOutput extends CoreOutput {
  @Field(() => PointTransaction, { nullable: true })
  pointTransaction?: PointTransaction;
}
