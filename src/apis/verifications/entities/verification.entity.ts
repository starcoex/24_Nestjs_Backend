import { Field, ObjectType } from '@nestjs/graphql';
import { CoreEntity } from 'src/apis/commons/entities/core.entity';
import { User } from 'src/apis/users/entities/user.entity';

@ObjectType()
export class Verification extends CoreEntity {
  @Field(() => String, { nullable: true })
  code?: string;

  @Field(() => User, { nullable: true })
  user?: User;
}
