import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { IAuthUser } from '../commons/interfaces/context';
import { IFilesServiceUpload } from '../files/interfaces/files-service.interface';
// import * as AWS from 'aws-sdk';
import { FileUpload } from 'graphql-upload-minimal';
import { Readable } from 'stream';

// AWS.config.update({
//   region: 'ap-northeast-2',
//   credentials: {
//     accessKeyId: process.env.AWS_S3_ACCESSKEY_ID,
//     secretAccessKey: process.env.AWS_S3_SECRET_ACCESSKEY,
//   },
// });

@Injectable()
export class AwsService {
  private s3Client: S3Client;
  // private readonly awsS3: AWS.S3;
  constructor(private configService: ConfigService) {
    this.s3Client = new S3Client({
      region: configService.get('AWS_S3_REGION'),
      credentials: {
        accessKeyId: configService.get('AWS_S3_ACCESSKEY_ID'),
        secretAccessKey: configService.get('AWS_S3_SECRET_ACCESSKEY'),
      },
    });
  }
  // async fileUploadS3(file: Express.Multer.File) {
  //   try {
  //     const objectName = `${Date.now()}-${file.originalname}`;
  //     // const upload = await new AWS.S3()
  //     //   .createBucket({ Bucket: 'starcoex-files' })
  //     //   .promise();
  //     // console.log(upload);
  //     await new AWS.S3()
  //       .putObject({
  //         Bucket: this.configService.get('AWS_S3_BUCKET_NAME'),
  //         Key: objectName,
  //         Body: file.buffer,
  //         ACL: 'public-read',
  //       })
  //       .promise();
  //     const url = `https://${this.configService.get(
  //       'AWS_S3_BUCKET_NAME',
  //     )}.s3.ap-northeast-2.amazonaws.com/${objectName}`;
  //     return { url };
  //   } catch (error) {
  //     return null;
  //     console.log(error);
  //   }
  // }

  // async fileUploadS3GraphQl(file: FileUpload, { user }: IAuthUser) {
  //   const { filename, createReadStream } = file;
  //   const buffer = await this.streamToBuffer(createReadStream());
  //   console.log(buffer);
  //   const objectName = `${user.id}-${Date.now()}-${filename}`;
  //   const result = await new AWS.S3()
  //     .putObject({
  //       Bucket: this.configService.get('AWS_S3_BUCKET_NAME'),
  //       Key: objectName,
  //       Body: buffer,
  //       ACL: 'public-read',
  //     })
  //     .promise();
  //   console.log(result);
  //   // return result;
  // }

  async fileUploadToS3(fileName: string, file: Express.Multer.File) {
    const command = new PutObjectCommand({
      Bucket: this.configService.get('AWS_S3_BUCKET_NAME'),
      Key: fileName,
      Body: file.buffer,
      ACL: 'public-read',
    });
    await this.s3Client.send(command);
    return `https://s3.${process.env.AWS_S3_REGION}.amazonaws.com/${process.env.AWS_S3_BUCKET_NAME}/${fileName}`;
  }

  async fileUploadToS3_2(file: Express.Multer.File) {
    const fileName = `${Date.now()}-${file.originalname}`;
    const command = new PutObjectCommand({
      Bucket: this.configService.get('AWS_S3_BUCKET_NAME'),
      Key: fileName,
      Body: file.buffer,
      ACL: 'public-read',
    });
    await this.s3Client.send(command);
    const fileUrl = `https://s3.${process.env.AWS_S3_REGION}.amazonaws.com/${process.env.AWS_S3_BUCKET_NAME}/${fileName}`;
    return { fileUrl };
  }
  // async saveImage(file: Express.Multer.File) {
  //   return await this.fileUpload(file);
  // }

  async fileUpload(file: Express.Multer.File) {
    const fileName = `${Date.now()}-${file.originalname}`;
    // const ext = file.originalname.split('.').pop();

    const fileUrl = await this.fileUploadToS3(`${fileName}`, file);
    return { fileUrl };
  }
}
