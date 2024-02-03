import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CoreOutput } from 'src/apis/commons/dto/output.dto';
import { User } from 'src/apis/users/entities/user.entity';

@InputType()
export class AuthLoginInput extends PickType(
  User,
  ['email', 'password'],
  InputType,
) {}

@ObjectType()
export class AuthLoginOutput extends CoreOutput {
  @Field(() => String, { nullable: true })
  accessToken?: string;

  @Field(() => String, { nullable: true })
  refreshToken?: string;
}
