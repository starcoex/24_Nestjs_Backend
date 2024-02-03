import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Min } from 'class-validator';
import { ProductTag } from 'src/apis/ProductsTags/entities/productTag.entity';
import { CoreEntity } from 'src/apis/commons/entities/core.entity';
import { ProductCategory } from 'src/apis/productsCategories/entities/productCategory.entity';
import { ProductSalesLocation } from 'src/apis/productsSalesLocations/entities/productSalesLocation.entity';

@ObjectType()
export class Product extends CoreEntity {
  @Field(() => String)
  name: string;

  @Field(() => String)
  description: string;

  @Min(0)
  @Field(() => Int)
  price: number;

  @Field(() => Boolean, { defaultValue: false })
  isSoldOut: boolean;

  @Field(() => ProductSalesLocation, { nullable: true })
  productSalesLocation?: ProductSalesLocation;

  @Field(() => ProductCategory, { nullable: true })
  productCategory?: ProductCategory;

  @Field(() => [ProductTag], { nullable: true })
  productTags?: ProductTag[];
}
