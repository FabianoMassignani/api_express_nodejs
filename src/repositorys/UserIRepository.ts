import { CreateUserDto } from "../interfaces/user/user.interface";
import { User } from "../interfaces/user/user.interface";

export interface UserIRepository {
  getAll(): Promise<User[]>;
  create(data: CreateUserDto): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  update(id: string, data: CreateUserDto): Promise<User | null>;
  delete(id: string): Promise<User | null>;
}
