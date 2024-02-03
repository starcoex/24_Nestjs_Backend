import { Test, TestingModule } from '@nestjs/testing';
import { FtpUbuntuService } from './ftp-ubuntu.service';

describe('FtpUbuntuService', () => {
  let service: FtpUbuntuService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FtpUbuntuService],
    }).compile();

    service = module.get<FtpUbuntuService>(FtpUbuntuService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
