import { CreateUserDto } from "../interfaces/user/user.interface";
import { UserIRepository } from "./userIRepository";
import { User } from "../interfaces/user/user.interface";
import { UserModel } from "../models";

class UserRepository implements UserIRepository {
  async getAll(): Promise<User[]> {
    const users = await UserModel.find();

    return users;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await UserModel.findOne({ email });

    return user;
  }

  async create(data: CreateUserDto): Promise<User> {
    const user = await UserModel.create(data);

    return user;
  }

  async update(id: string, data: CreateUserDto): Promise<User | null> {
    const user = await UserModel.findByIdAndUpdate(id, data, { new: true });

    return user;
  }

  async delete(id: string): Promise<User | null> {
    const user = await UserModel.findByIdAndDelete(id);

    return user;
  }
}

export default UserRepository;
