import { Response } from 'express';
import { FileUpload } from 'graphql-upload-minimal';

export interface IFilesServiceUpload {
  file: FileUpload;
}
export interface IFilesServiceUploadMultiple {
  files: FileUpload[];
}

export interface IFileServiceCloudFlare {
  res: Response;
}

export interface IFileServiceCloudFlareUpload {
  file: FileUpload;
}

export interface IFileServiceCloudS3 {
  file: FileUpload;
}
