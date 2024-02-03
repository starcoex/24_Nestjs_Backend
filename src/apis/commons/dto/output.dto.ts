import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CoreOutput {
  @Field(() => String, { nullable: true })
  error?: string;

  @Field(() => Boolean)
  ok: boolean;

  @Field(() => String, { nullable: true })
  id?: string;
}
