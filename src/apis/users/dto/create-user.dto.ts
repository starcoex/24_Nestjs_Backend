import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { User } from '../entities/user.entity';
import { CoreOutput } from 'src/apis/commons/dto/output.dto';

@InputType()
export class CreateUserInput extends PickType(
  User,
  ['email', 'name', 'password'],
  InputType,
) {}

@ObjectType()
export class CreateUserOutput extends CoreOutput {
  @Field(() => User, { nullable: true })
  user?: User;
}
