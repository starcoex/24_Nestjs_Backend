import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { User } from '../entities/user.entity';
import { CoreOutput } from 'src/apis/commons/dto/output.dto';

@InputType()
export class FindOneUserInput extends PickType(User, ['email'], InputType) {}

@ObjectType()
export class FindOneUserOutput extends CoreOutput {
  @Field(() => User, { nullable: true })
  user?: User;
}
