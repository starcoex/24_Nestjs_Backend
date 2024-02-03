import { Field, Float, ObjectType } from '@nestjs/graphql';
import { CoreEntity } from 'src/apis/commons/entities/core.entity';
import { Product } from 'src/apis/products/entities/product.entity';

@ObjectType()
export class ProductSalesLocation extends CoreEntity {
  @Field(() => String)
  address: string;

  @Field(() => String)
  addressDetail: string;

  @Field(() => Float)
  lat: number;

  @Field(() => Float)
  lng: number;

  @Field(() => Date, { nullable: true })
  meetingTime?: Date;

  @Field(() => Product, { nullable: true })
  product?: Product;
}
