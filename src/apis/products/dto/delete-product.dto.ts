import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { Product } from '../entities/product.entity';
import { CoreOutput } from 'src/apis/commons/dto/output.dto';

@InputType()
export class DeleteProductInput extends PickType(Product, ['id'], InputType) {}

@ObjectType()
export class DeleteProductOutput extends CoreOutput {
  @Field(() => Product, { nullable: true })
  product?: Product;
}
