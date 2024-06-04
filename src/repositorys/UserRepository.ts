import { CreateUserDto } from "../interfaces/user/user.interface";
import { IUserRepository } from "./UserIRepository";
import { User } from "../interfaces/user/user.interface";
import { UserModel } from "../models";

class UserRepository implements IUserRepository {
  constructor() {}

  async findByEmail(email: string): Promise<User | null> {
    const user = await UserModel.findOne({ email });

    return user;
  }

  async create(data: CreateUserDto): Promise<User> {
    const user = await UserModel.create(data);

    return user;
  }
}

export default UserRepository;
