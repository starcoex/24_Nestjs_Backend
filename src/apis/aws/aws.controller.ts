import {
  BadRequestException,
  Controller,
  Post,
  Res,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AwsService } from './aws.service';
import { IContext } from '../commons/interfaces/context';
import { Response } from 'express';

@Controller('aws')
export class AwsController {
  constructor(private readonly awsService: AwsService) {}
  @Post('files')
  @UseInterceptors(FileInterceptor('files'))
  filesCloudAWS(@UploadedFiles() files: Express.MulterS3.File[]) {
    if (!files.length) {
      throw new BadRequestException('hi');
    }
    return files.map(({ location }) => location);
  }

  // @Post('file')
  // @UseInterceptors(FileInterceptor('file'))
  // fileCloudAWS(@UploadedFile() file: Express.MulterS3.File) {
  //   return this.awsService.fileUploadS3(file);
  // }

  // @Post('file')
  // @UseInterceptors(FileInterceptor('file'))
  // fileCloudAWSS3(@UploadedFile() file: Express.MulterS3.File) {
  //   return this.awsService.fileUpload(file);
  // }

  @Post('file')
  @UseInterceptors(FileInterceptor('file'))
  fileCloudAWSS3_2(@UploadedFile() file: Express.MulterS3.File) {
    return this.awsService.fileUploadToS3_2(file);
  }
}
