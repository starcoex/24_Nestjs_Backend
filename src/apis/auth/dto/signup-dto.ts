import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CoreOutput } from 'src/apis/commons/dto/output.dto';
import { User } from 'src/apis/users/entities/user.entity';

@InputType()
export class AuthSignUpInput extends PickType(
  User,
  ['email', 'password', 'name'],
  InputType,
) {}

@ObjectType()
export class AuthSignUpOutput extends CoreOutput {
  @Field(() => String)
  accessToken: string;

  @Field(() => String)
  refreshToken: string;

  @Field(() => User, { nullable: true })
  user?: User;
}
