import {
  Field,
  InputType,
  ObjectType,
  PickType,
  PartialType,
} from '@nestjs/graphql';
import { PointTransaction } from '../entities/pointTransaction.entity';
import { CoreOutput } from 'src/apis/commons/dto/output.dto';

@InputType()
export class CreateForPaymentInput extends PartialType(
  PickType(PointTransaction, ['impUid', 'amount', 'status'], InputType),
) {}

@ObjectType()
export class CreateForPaymentOutput extends CoreOutput {
  @Field(() => PointTransaction, { nullable: true })
  pointTransaction?: PointTransaction;
}
