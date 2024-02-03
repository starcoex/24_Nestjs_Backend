import { Module } from '@nestjs/common';
import { ProductsResolver } from './products.resolver';
import { ProductsService } from './products.service';
import { ProductsSalesLocationsService } from '../productsSalesLocations/productsSalesLocations.service';

@Module({
  providers: [ProductsResolver, ProductsService, ProductsSalesLocationsService],
})
export class ProductsModule {}
