import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ProductsService } from './products.service';
import {
  CreateProductInput,
  CreateProductOutput,
} from './dto/create-product.dto';
import { AllProductOutput } from './dto/all-product.dto';
import { OneProductInput, OneProductOutput } from './dto/one-product.dto';
import {
  UpdateProductOutput,
  UpdateProductInput,
} from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { DeleteProductOutput } from './dto/delete-product.dto';

@Resolver()
export class ProductsResolver {
  constructor(private readonly productsService: ProductsService) {}

  @Query(() => AllProductOutput)
  AllProducts() {
    return this.productsService.allProducts();
  }

  @Query(() => Product)
  OneProduct(@Args('productId') productId: string): Promise<Product> {
    return this.productsService.oneProduct({ productId });
  }

  @Mutation(() => CreateProductOutput)
  createProduct(
    @Args('input') createProductInput: CreateProductInput,
  ): Promise<CreateProductOutput> {
    return this.productsService.createProduct({ createProductInput });
  }

  @Mutation(() => UpdateProductOutput)
  updateProduct(
    @Args('productId') productId: string,
    @Args('input')
    updateProductInput: UpdateProductInput,
  ): Promise<UpdateProductOutput> {
    return this.productsService.updateProduct({
      productId,
      updateProductInput,
    });
  }

  @Mutation(() => DeleteProductOutput)
  deleteProduct(
    @Args('productId') productId: string,
  ): Promise<DeleteProductOutput> {
    return this.productsService.deleteProduct({ productId });
  }
}
