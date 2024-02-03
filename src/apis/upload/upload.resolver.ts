import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UploadService } from './upload.service';
import { UploadSingle } from './entities/upload.entity';
import { UploadFileInput, UploadFilesInput } from './dto/upload-file.dto';

@Resolver()
export class UploadResolver {
  constructor(private readonly uploadService: UploadService) {}

  @Mutation(() => UploadSingle)
  uploadSingleFiles(@Args() args: UploadFileInput): Promise<any> {
    return this.uploadService.uploadSingleGraphql(args);
  }

  @Mutation(() => [UploadSingle])
  async uploadMultipleFiles(@Args() args: UploadFilesInput): Promise<any> {
    return this.uploadService.uploadMultipleGraphql(args);
  }
}
