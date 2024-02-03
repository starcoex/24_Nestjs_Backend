import { Field } from '@nestjs/graphql';
import { CoreOutput } from 'src/apis/commons/dto/output.dto';
import { User } from 'src/apis/users/entities/user.entity';

export class NewTokensOutput extends CoreOutput {
  @Field(() => String)
  accessToken: string;

  @Field(() => String)
  refreshToken: string;

  @Field(() => User)
  user: User;
}
