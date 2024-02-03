import { Controller, Get, Post, Res } from '@nestjs/common';
import { FilesService } from './files.service';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';

@Controller('files')
export class FilesController {
  constructor(
    private readonly filesService: FilesService,
    private readonly configService: ConfigService,
  ) {}

  @Get('cloudflare')
  fileCloudFlare(@Res() res: Response) {
    return this.filesService.fileCloudFlare({ res });
  }
}
