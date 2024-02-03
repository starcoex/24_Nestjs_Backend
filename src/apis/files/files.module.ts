import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesResolver } from './files.resolver';
import { FilesController } from './files.controller';

@Module({
  providers: [FilesService, FilesResolver],
  controllers: [FilesController],
})
export class FilesModule {}
