import { CreateUserDto } from "../interfaces/user/user.interface";
import { User } from "../interfaces/user/user.interface";

export interface IUserRepository {
  create(data: CreateUserDto): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
}
