import { Field, ObjectType } from '@nestjs/graphql';
import { CoreEntity } from 'src/apis/commons/entities/core.entity';
import { Product } from 'src/apis/products/entities/product.entity';

@ObjectType()
export class ProductTag extends CoreEntity {
  @Field(() => String)
  name: string;

  @Field(() => [Product], { nullable: true })
  products?: Product[];
}
