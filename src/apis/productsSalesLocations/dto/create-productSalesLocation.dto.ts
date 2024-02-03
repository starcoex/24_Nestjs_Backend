import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { ProductSalesLocation } from '../entities/productSalesLocation.entity';
import { CoreOutput } from 'src/apis/commons/dto/output.dto';

@InputType()
export class CreateProductSalesLocationInput extends PickType(
  ProductSalesLocation,
  ['address', 'addressDetail', 'lat', 'lng', 'meetingTime'],
  InputType,
) {}

@ObjectType()
export class CreateProductSalesLocationOutput extends CoreOutput {
  @Field(() => ProductSalesLocation, { nullable: true })
  productSalesLocation?: ProductSalesLocation;
}
