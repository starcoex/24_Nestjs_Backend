import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { CoreEntity } from 'src/apis/commons/entities/core.entity';

export enum EnumService {
  Cloudinary = 'Cloudinary',
  S3Storage = 'S3storage',
  Web3Storage = 'Web3storage',
}

export enum EnumFolders {
  Avatar = 'avatar',
  Background = 'background',
  Gallery = 'gallery',
}

registerEnumType(EnumService, {
  name: 'EnumService',
});

@ObjectType()
export class UploadSingle extends CoreEntity {
  @Field(() => String)
  url!: string;

  @Field(() => String)
  format!: string;

  @Field(() => String)
  folder!: string;

  @Field(() => Int)
  width!: number;

  @Field(() => Int)
  height!: number;

  @Field(() => Int)
  bytes!: number;
}
