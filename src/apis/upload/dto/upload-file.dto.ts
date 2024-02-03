import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { IsEnum, IsString } from 'class-validator';
import { EnumService } from '../entities/upload.entity';
import { FileUpload, GraphQLUpload, Upload } from 'graphql-upload-minimal';

@InputType()
class UploadParamInput {
  @IsEnum(EnumService)
  @Field(() => EnumService)
  uploadService!: EnumService;

  @IsString()
  @Field(() => String)
  folder!: string;
}

@ArgsType()
export class UploadFileInput {
  @Field(() => UploadParamInput, { nullable: true })
  setting!: UploadParamInput;

  @Field(() => GraphQLUpload)
  file!: FileUpload;
}

@ArgsType()
export class UploadFilesInput {
  @Field(() => UploadParamInput, { nullable: false })
  setting!: UploadParamInput;

  @Field(() => [GraphQLUpload])
  files!: FileUpload[];
}
