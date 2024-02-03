import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { AwsService } from './aws.service';
import { FileUpload, GraphQLUpload } from 'graphql-upload-minimal';
import { IContext } from '../commons/interfaces/context';

@Resolver()
export class AwsResolver {
  constructor(private readonly awsService: AwsService) {}

  // @Mutation(() => String)
  // uploadFileS3(
  //   @Args({ name: 'file', type: () => GraphQLUpload }) file: FileUpload,
  //   @Context() context: IContext,
  // ) {
  //   const user = context.req.user;
  //   return this.awsService.fileUploadS3GraphQl(file, { user });
  // }
}
