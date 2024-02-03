import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { IsEnum } from 'class-validator';
import { CoreEntity } from 'src/apis/commons/entities/core.entity';
import { User } from 'src/apis/users/entities/user.entity';

export enum POINT_TRANSACTION_STATUS_ENUM {
  Cancel = 'Cancel',
  Payment = 'Payment',
}

registerEnumType(POINT_TRANSACTION_STATUS_ENUM, {
  name: 'POINT_TRANSACTION_STATUS_ENUM',
});

@ObjectType()
export class PointTransaction extends CoreEntity {
  @Field(() => String)
  impUid: string;

  @Field(() => Int)
  amount: number;

  @Field(() => POINT_TRANSACTION_STATUS_ENUM)
  @IsEnum(POINT_TRANSACTION_STATUS_ENUM)
  status: POINT_TRANSACTION_STATUS_ENUM;

  @Field(() => User, { nullable: true })
  user?: User;
}
