import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput, CreateUserOutput } from './dto/create-user.dto';
import { FindOneUserInput, FindOneUserOutput } from './dto/find-one.dto';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => FindOneUserOutput)
  findOneUser(@Args('input') findOneUserInput: FindOneUserInput) {
    return this.usersService.findOne(findOneUserInput);
  }

  @Mutation(() => User)
  createUser(@Args('input') createUserInput: CreateUserInput): Promise<User> {
    return this.usersService.create(createUserInput);
  }
}
