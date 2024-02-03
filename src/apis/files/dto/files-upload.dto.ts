import { ArgsType, Field, InputType, PickType } from '@nestjs/graphql';
import { File } from '../entities/files.entity';
import { FileUpload, GraphQLUpload } from 'graphql-upload-minimal';

// @InputType()
// export class FilesUploadInput extends PickType(File, ['file'], InputType) {}

@ArgsType()
export class FilesUploadInput {
  @Field(() => GraphQLUpload, { nullable: true })
  file?: FileUpload;
}
