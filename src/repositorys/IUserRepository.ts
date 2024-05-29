import { CreateUserDto } from "../interfaces/user.interface";
import { User } from "../interfaces/user.interface";

export interface IUserRepository {
  create(data: CreateUserDto): Promise<User>;
}
