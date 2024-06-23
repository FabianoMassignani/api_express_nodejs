import {
  CreateUserDto,
  UpdateUserDto,
} from "../interfaces/user/user.interface";
import { User } from "../interfaces/user/user.interface";

export interface UserIRepository {
  getAll(limit: number, page: number, search: string): Promise<User[]>;
  contUsers(): Promise<number>;
  create(data: CreateUserDto): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  update(data: UpdateUserDto): Promise<User | null>;
  delete(id: string): Promise<User | null>;
}
