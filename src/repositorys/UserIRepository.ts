import { CreateUser } from "../interfaces/user/user.interface";
import { User } from "../interfaces/user/user.interface";

export interface UserIRepository {
  create(data: CreateUser): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
}
