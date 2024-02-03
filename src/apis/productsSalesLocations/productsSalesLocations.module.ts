import { Module } from '@nestjs/common';
import { ProductsSalesLocationsResolver } from './productsSalesLocations.resolver';
import { ProductsSalesLocationsService } from './productsSalesLocations.service';

@Module({
  providers: [ProductsSalesLocationsResolver, ProductsSalesLocationsService],
})
export class ProductsSalesLocationsModule {}
