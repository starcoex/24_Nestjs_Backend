import { Field, ObjectType } from '@nestjs/graphql';
import { CoreEntity } from 'src/apis/commons/entities/core.entity';
import { FileUpload, GraphQLUpload } from 'graphql-upload-minimal';

@ObjectType()
export class File extends CoreEntity {
  @Field(() => GraphQLUpload)
  file: FileUpload;
}
