import { ObjectType, Field, Int } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { CoreEntity } from 'src/apis/commons/entities/core.entity';
import { PointTransaction } from 'src/apis/points-transactions/entities/pointTransaction.entity';
import { Product } from 'src/apis/products/entities/product.entity';

@ObjectType()
export class User extends CoreEntity {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @Field(() => String)
  email: string;

  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  password: string;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => Int)
  point?: number;

  @Field(() => [Product], { nullable: true })
  products?: Product[];

  @Field(() => [PointTransaction], { nullable: true })
  pointsTransactions?: PointTransaction[];
}
