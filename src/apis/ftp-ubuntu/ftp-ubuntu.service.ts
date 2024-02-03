import { Injectable } from '@nestjs/common';
import { FtpService } from 'nestjs-ftp';
import { Readable } from 'stream';

@Injectable()
export class FtpUbuntuService {
  constructor(private readonly ftpService: FtpService) {}

  // async uploadFtpUbuntu(source: Readable | string, toRemotePath: string): Promise<string>) {
  //   try {
  //     await this.ftpService.upload(source,destination)
  // } catch (error) {
  //     throw new Error(error)
  // }
}
