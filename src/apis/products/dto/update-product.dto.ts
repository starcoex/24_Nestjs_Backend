import {
  Field,
  InputType,
  ObjectType,
  PartialType,
  PickType,
} from '@nestjs/graphql';
import { Product } from '../entities/product.entity';
import { CoreOutput } from 'src/apis/commons/dto/output.dto';

@InputType()
export class UpdateProductInput extends PartialType(
  PickType(Product, ['id', 'name', 'description', 'price'], InputType),
) {}

@ObjectType()
export class UpdateProductOutput extends CoreOutput {
  @Field(() => Product, { nullable: true })
  product?: Product;
}
