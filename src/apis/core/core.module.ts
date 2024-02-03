import { Module } from '@nestjs/common';
import { CommonsModule } from '../commons/commons.module';

@Module({
  imports: [CommonsModule],
  exports: [CommonsModule],
})
export class CoreModule {}
