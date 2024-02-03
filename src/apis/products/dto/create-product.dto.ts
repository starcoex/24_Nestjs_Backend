import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { Product } from '../entities/product.entity';
import { CoreOutput } from 'src/apis/commons/dto/output.dto';

@InputType()
export class CreateProductInput extends PickType(
  Product,
  ['name', 'description', 'price'],
  InputType,
) {}

@ObjectType()
export class CreateProductOutput extends CoreOutput {
  @Field(() => Product, { nullable: true })
  product?: Product;
}
