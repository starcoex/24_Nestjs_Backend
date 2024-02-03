import { Injectable } from '@nestjs/common';
import { UploadFileInput, UploadFilesInput } from './dto/upload-file.dto';
import { EnumService } from './entities/upload.entity';
import { Readable } from 'stream';
import toStream = require('buffer-to-stream');
// import * as toStream from 'buffer-to-stream';
import { v2 } from 'cloudinary';

@Injectable()
export class UploadService {
  async uploadSingleGraphql(args: UploadFileInput): Promise<any> {
    if (args.setting.uploadService === EnumService.Cloudinary) {
      return this.uploadSingleToCloudinaryGraphql(args);
    }
    if (args.setting.uploadService === EnumService.S3Storage) {
      return;
    }
    if (args.setting.uploadService === EnumService.Web3Storage) {
      return;
    }
  }

  async uploadSingleToCloudinaryGraphql(args: UploadFileInput): Promise<any> {
    const { createReadStream } = await args.file;
    const buffer = await this.streamToBuffer(createReadStream());
    return this.cloudinary(buffer, args.setting.folder);
  }

  async uploadMultipleGraphql(args: UploadFilesInput): Promise<any> {
    if (args.setting.uploadService === EnumService.Cloudinary) {
      return this.uploadMultipleToCloudinaryGraphql(args);
    }
    if (args.setting.uploadService === EnumService.S3Storage) {
      return;
    }

    if (args.setting.uploadService === EnumService.Web3Storage) {
      return;
    }
  }

  async uploadMultipleToCloudinaryGraphql(
    args: UploadFilesInput,
  ): Promise<any> {
    try {
      const arrayResponse: any[] = [];
      await Promise.all(
        args.files.map(async (file: any) => {
          const argsReq = {
            file,
            setting: args.setting,
          };
          const result = await this.uploadSingleToCloudinaryGraphql(argsReq);
          arrayResponse.push(result);
        }),
      );
      return arrayResponse;
    } catch (error) {
      console.log(error);
    }
  }

  async streamToBuffer(stream: Readable): Promise<Buffer> {
    const buffer: Uint8Array[] = [];
    return new Promise((resolve, reject) =>
      stream
        .on('error', (error) => reject(error))
        .on('data', (data) => buffer.push(data))
        .on('end', () => resolve(Buffer.concat(buffer))),
    );
  }

  async cloudinary(buffer: any, folder: any) {
    return await new Promise((resolve, reject) => {
      const upload = v2.uploader.upload_stream(
        { folder: folder },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        },
      );
      toStream(buffer).pipe(upload);
    });
  }
}
