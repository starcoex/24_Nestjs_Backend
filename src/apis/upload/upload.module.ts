import { Module } from '@nestjs/common';
import { UploadResolver } from './upload.resolver';
import { UploadService } from './upload.service';
import { CloudinaryProvider } from './cloundinary.provider';

@Module({
  providers: [UploadResolver, UploadService, CloudinaryProvider],
  exports: [CloudinaryProvider],
})
export class UploadModule {}
