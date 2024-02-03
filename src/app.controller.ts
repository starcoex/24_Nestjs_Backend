import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from 'express';
import { CommonsService } from './apis/commons/commons.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly commonsService: CommonsService,
  ) {}

  @Get('/public')
  publicEndpoint(@Req() req: Request): string {
    console.log(req.cookies);
    return this.appService.getHello();
  }
}
