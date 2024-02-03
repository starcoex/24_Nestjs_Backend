import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { ProductsSalesLocationsService } from './productsSalesLocations.service';
import {
  CreateProductSalesLocationInput,
  CreateProductSalesLocationOutput,
} from './dto/create-productSalesLocation.dto';

@Resolver()
export class ProductsSalesLocationsResolver {
  constructor(
    private readonly productsSalesLocationsService: ProductsSalesLocationsService,
  ) {}

  @Mutation(() => CreateProductSalesLocationOutput)
  createProductSalesLocation(
    @Args('input')
    createProductSalesLocationInput: CreateProductSalesLocationInput,
  ): Promise<CreateProductSalesLocationOutput> {
    return this.productsSalesLocationsService.createProductSalesLocation({
      createProductSalesLocationInput,
    });
  }
}
