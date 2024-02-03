import { Field, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/apis/commons/dto/output.dto';
import { Product } from '../entities/product.entity';

@ObjectType()
export class AllProductOutput extends CoreOutput {
  @Field(() => [Product], { nullable: true })
  products?: Product[];
}
