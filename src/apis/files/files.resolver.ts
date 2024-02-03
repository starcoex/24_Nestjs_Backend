import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { FilesService } from './files.service';
import { FileUpload, GraphQLUpload } from 'graphql-upload-minimal';
import { IContext } from '../commons/interfaces/context';

@Resolver()
export class FilesResolver {
  constructor(private readonly filesService: FilesService) {}

  @Mutation(() => String)
  uploadFileGoogleCloud(
    @Args({ name: 'file', type: () => GraphQLUpload }) file: FileUpload,
  ) {
    return this.filesService.uploadGoogleCloud({ file });
  }

  @Mutation(() => String)
  uploadFile(
    @Args({ name: 'file', type: () => GraphQLUpload }) file: FileUpload,
    @Context() context: IContext,
  ) {
    const user = context.req.user;
    return this.filesService.upload({ file }, { user });
  }

  // @Mutation(() => [String])
  // uploadFile(
  //   @Args({ name: 'files', type: () => [GraphQLUpload] }) files: FileUpload[],
  // ) {
  //   return this.filesService.upload({ files });
  // }

  @Mutation(() => [String])
  uploadGoogleCloudMultiple(
    @Args({ name: 'files', type: () => [GraphQLUpload] }) files: FileUpload[],
    @Context() context: IContext,
  ): Promise<string[]> {
    const user = context.req.user;
    return this.filesService.uploadGoogleCloudMultiple({ files }, { user });
  }

  // @UseGuards(GqlAuthGuard('access'))
  // @Mutation(() => String)
  // fileCloudFlareGraphql(
  //   @Args({ name: 'file', type: () => GraphQLUpload }) file: FileUpload,
  //   @Context() context: IContext,
  // ) {
  //   this.filesService.fileCloudFlareGraphql({ file }, context);
  // }
}
