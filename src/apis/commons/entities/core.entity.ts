import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CoreEntity {
  @Field(() => String)
  id: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date, { nullable: true })
  updatedAt?: Date;
}
