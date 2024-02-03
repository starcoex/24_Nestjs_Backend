import { CreateUserInput } from '../dto/create-user.dto';
import { FindOneUserInput } from '../dto/find-one.dto';

export interface IUsersServiceCreate {
  createUserInput: CreateUserInput;
}
export interface IUserServiceCheckExistenceUser {
  email: string;
}
export interface IUserServiceFindOneUser {
  findOneUserInput: FindOneUserInput;
}
