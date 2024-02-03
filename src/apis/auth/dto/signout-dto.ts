import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CoreOutput } from 'src/apis/commons/dto/output.dto';
import { User } from 'src/apis/users/entities/user.entity';

@InputType()
export class AuthSignOutInput extends PickType(User, ['id'], InputType) {}

@ObjectType()
export class AuthSignOutOutput extends CoreOutput {
  @Field(() => Boolean)
  loggedOut: boolean;
}
