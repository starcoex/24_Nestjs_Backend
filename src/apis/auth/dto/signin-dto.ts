import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CoreOutput } from 'src/apis/commons/dto/output.dto';
import { User } from 'src/apis/users/entities/user.entity';

@InputType()
export class AuthSignInInput extends PickType(
  User,
  ['email', 'password'],
  InputType,
) {}

@ObjectType()
export class AuthSignInOutput extends CoreOutput {
  @Field(() => String)
  accessToken: string;

  @Field(() => String)
  refreshToken: string;

  @Field(() => User, { nullable: true })
  user?: User;
}
