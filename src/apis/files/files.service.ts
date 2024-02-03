import { Storage } from '@google-cloud/storage';
import { Injectable } from '@nestjs/common';
import {
  IFileServiceCloudFlare,
  IFileServiceCloudFlareUpload,
  IFilesServiceUpload,
  IFilesServiceUploadMultiple,
} from './interfaces/files-service.interface';
import { ConfigService } from '@nestjs/config';
import { IAuthUser, IContext } from '../commons/interfaces/context';
import { createWriteStream } from 'fs';
import { CostExplorer } from 'aws-sdk';

@Injectable()
export class FilesService {
  constructor(private readonly configService: ConfigService) {}

  async upload({ file }: IFilesServiceUpload, { user }: IAuthUser) {
    console.log(file);
    let fileUrl = null;
    if (file) {
      const { filename, createReadStream } = file;
      const newFilename = `${user.id}-${Date.now()}-${filename}`;
      const readStream = createReadStream();
      const writheString = createWriteStream(
        process.cwd() + '/uploads/' + newFilename,
      );
      readStream.pipe(writheString);
      fileUrl = `http://localhost:3100/static/${newFilename}`;
    }
    return fileUrl;
  }

  // async upload({ files }: IFilesServiceUploadMultiple): Promise<string[]> {
  //   console.log(files[1]);
  //   const waitedFiles = await Promise.all(files);
  //   console.log(waitedFiles);
  //   const storage = new Storage({
  //     projectId: 'starcoex',
  //     keyFilename: 'gcp-file-storage.json',
  //   }).bucket('starcoex-files');
  //   const results = await Promise.all(
  //     waitedFiles.map((el) => {
  //       return new Promise<string>((resolve, reject) => {
  //         el.createReadStream()
  //           .pipe(storage.file(el.filename).createWriteStream())
  //           .on('finish', () => resolve(`starcoex-files/${el.filename}}`))
  //           .on('error', () => reject('실패'));
  //       });
  //     }),
  //   );
  //   console.log(results);
  //   return results;
  // }

  async uploadGoogleCloudMultiple(
    { files }: IFilesServiceUploadMultiple,
    { user }: IAuthUser,
  ): Promise<string[]> {
    console.log(files);
    const waitedFiles = await Promise.all(files);
    console.log(waitedFiles);
    const storage = new Storage({
      projectId: 'starcoex',
      keyFilename: 'gcp-file-storage.json',
    }).bucket('starcoex-files');
    const results = await Promise.all(
      waitedFiles.map((el) => {
        return new Promise((resolve, reject) => {
          el.createReadStream()
            .pipe(storage.file(el.filename).createWriteStream())
            .on('finish', () => resolve(`starcoex-files/${el.filename}}`))
            .on('error', () => reject('실패'));
        });
      }),
    );

    return ['1', '2'];
  }

  async uploadGoogleCloud({ file }: IFilesServiceUpload) {
    const storage = new Storage({
      projectId: 'starcoex',
      keyFilename: 'gcp-file-storage.json',
    }).bucket('starcoex-files');
    await new Promise((resolve, reject) => {
      file
        .createReadStream()
        .pipe(storage.file(file.filename).createWriteStream())
        .on('finish', () => {
          console.log('성공');
          resolve('성공');
        })
        .on('error', () => {
          console.log('실패');
          reject('실패');
        });
    });
    // const storage = new Storage({
    //   projectId: 'starcoex',
    //   keyFilename: 'gcp-file-storage.json',
    // }).bucket('starcoex-files');
    // file
    //   .createReadStream()
    //   .pipe(storage.file(file.filename).createWriteStream())
    //   .on('finish', () => {
    //     console.log('성공');
    //   })
    //   .on('error', () => {
    //     console.log('실패');
    //   });
    return '끝';
  }

  async fileCloudFlare({ res }: IFileServiceCloudFlare) {
    const response = await (
      await fetch(
        `https://api.cloudflare.com/client/v4/accounts/${this.configService.get(
          'CLOUDFLARE_IMAGE_ACCOUNT_ID',
        )}/images/v1/direct_upload`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.configService.get(
              'CLOUDFLARE_IMAGE_API_TOKEN',
            )}`,
          },
        },
      )
    ).json();
    console.log(response);
    return res.json({ ...response.result });
  }

  async fileCloudFlareGraphql(
    { file }: IFileServiceCloudFlareUpload,
    context: IContext,
  ) {
    const {
      req: { user },
      res,
    } = context;

    const response = await (
      await fetch(
        `https://api.cloudflare.com/client/v4/accounts/${this.configService.get(
          'CLOUDFLARE_IMAGE_ACCOUNT_ID',
        )}/images/v1/direct_upload`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.configService.get(
              'CLOUDFLARE_IMAGE_API_TOKEN',
            )}`,
          },
        },
      )
    ).json();
    console.log(response);
    return res.json({ ...response.result });
  }
}
