import { CreateUserDto } from "../interfaces/user/user.interface";
import { UserIRepository } from "./userIRepository";
import { User } from "../interfaces/user/user.interface";
import { UserModel } from "../models";

class UserRepository implements UserIRepository {
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
