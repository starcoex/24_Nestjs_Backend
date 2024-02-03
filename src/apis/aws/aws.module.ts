import { Module } from '@nestjs/common';
import { AwsService } from './aws.service';
import { ConfigModule } from '@nestjs/config';
import { AwsResolver } from './aws.resolver';
import { AwsController } from './aws.controller';

@Module({
  imports: [ConfigModule],
  providers: [AwsService, AwsResolver],
  exports: [AwsService],
  controllers: [AwsController],
})
export class AwsModule {}
