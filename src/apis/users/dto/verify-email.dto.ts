import { InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CoreOutput } from 'src/apis/commons/dto/output.dto';
import { Verification } from 'src/apis/verifications/entities/verification.entity';

@InputType()
export class VerifyEmailInput extends PickType(
  Verification,
  ['code'],
  InputType,
) {}

@ObjectType()
export class VerifyEmailOutput extends CoreOutput {}
