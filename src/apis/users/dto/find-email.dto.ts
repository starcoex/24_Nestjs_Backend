import { Field } from '@nestjs/graphql';
import { CoreOutput } from 'src/apis/commons/dto/output.dto';
import { User } from '../entities/user.entity';

export class FindEmailUserOutput extends CoreOutput {
  @Field(() => User, { nullable: true })
  user?: User;
}
