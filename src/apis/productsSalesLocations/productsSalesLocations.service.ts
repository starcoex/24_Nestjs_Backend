import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CreateProductSalesLocationOutput } from './dto/create-productSalesLocation.dto';
import { IProductSalesLocationServiceCreate } from './interface/productsSalesLocations-service.interface';

@Injectable({})
export class ProductsSalesLocationsService {
  constructor(private readonly prisma: PrismaService) {}

  async createProductSalesLocation({
    createProductSalesLocationInput,
  }: IProductSalesLocationServiceCreate): Promise<CreateProductSalesLocationOutput> {
    const productSalesLocation = await this.prisma.productSalesLocation.create({
      data: {
        address: createProductSalesLocationInput.address,
        addressDetail: createProductSalesLocationInput.addressDetail,
        lat: createProductSalesLocationInput.lat,
        lng: createProductSalesLocationInput.lng,
      },
    });
    console.log(productSalesLocation);
    return {
      ok: true,
    };
  }
}
