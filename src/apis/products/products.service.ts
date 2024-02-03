import { Injectable, UnprocessableEntityException } from '@nestjs/common';
// import { PrismaService } from 'src/prisma/prisma.service';

import {
  IProductServiceCheckSoldOut,
  IProductServiceCreate,
  IProductServiceDelete,
  IProductServiceFindOne,
  IProductServiceUpdate,
} from './interfaces/products-service.interface';
import { CreateProductOutput } from './dto/create-product.dto';
import { AllProductOutput } from './dto/all-product.dto';
import { OneProductOutput } from './dto/one-product.dto';
import { UpdateProductOutput } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { DeleteProductOutput } from './dto/delete-product.dto';
import { PrismaService } from 'nestjs-prisma';
import { ProductsSalesLocationsService } from '../productsSalesLocations/productsSalesLocations.service';

@Injectable()
export class ProductsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly productsSalesLocationsService: ProductsSalesLocationsService,
  ) {}

  async allProducts(): Promise<AllProductOutput> {
    const products = await this.prisma.product.findMany({});
    return {
      ok: true,
      products,
    };
  }

  async oneProduct({ productId }: IProductServiceFindOne): Promise<Product> {
    const product = await this.prisma.product.findFirst({
      where: { id: productId },
    });
    return product;
  }

  async createProduct({
    createProductInput,
  }: IProductServiceCreate): Promise<CreateProductOutput> {
    const product = await this.prisma.product.create({
      data: {
        name: createProductInput.name,
        description: createProductInput.description,
        price: createProductInput.price,
        user: {
          create: {
            email: 'starcoex12222@gmail.com',
            name: 'kkk122',
            password: '2323',
          },
        },
        productCategory: {
          create: {
            name: 'ui121211e122222',
          },
        },
      },
      include: { productSalesLocation: true },
    });
    return {
      ok: true,
      id: product.id,
    };
  }

  async updateProduct({
    productId,
    updateProductInput,
  }: IProductServiceUpdate): Promise<UpdateProductOutput> {
    const product = await this.oneProduct({ productId });
    // const product = await this.prisma.product.findFirst({
    //   where: { id: productId },
    // });
    this.checkSoldOut({ product });
    await this.prisma.product.update({
      where: { id: productId },
      data: {
        name: updateProductInput.name,
        price: updateProductInput.price,
        description: updateProductInput.description,
        // user: {
        //   update: {
        //     email: 'star2222@gmail.com',
        //     name: 'kkk2',
        //   },
        // },
        // productCategory: {
        //   update: {
        //     name: 'unique1222',
        //   },
        // },
      },
    });
    return {
      ok: true,
    };
  }
  async deleteProduct({
    productId,
  }: IProductServiceDelete): Promise<DeleteProductOutput> {
    const product = await this.prisma.product.delete({
      where: { id: productId },
    });
    return {
      ok: true,
    };
  }

  checkSoldOut({ product }: IProductServiceCheckSoldOut): void {
    if (product.isSoldOut) {
      throw new UnprocessableEntityException('이미 판매 완료된 상품입니다');
    }
  }
}
