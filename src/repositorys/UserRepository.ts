import {
  CreateUserDto,
  UpdateUserDto,
} from "../interfaces/user/user.interface";
import { UserIRepository } from "./userIRepository";
import { User } from "../interfaces/user/user.interface";
import { UserModel } from "../models";

class UserRepository implements UserIRepository {
  async getAll(limit: number, page: number, search: string): Promise<User[]> {
    const users = await UserModel.find(
      {
        $or: [
          { username: { $regex: search, $options: "i" } },
          { email: { $regex: search, $options: "i" } },
        ],
      },
      { password: 0 }
    )
      .limit(limit)
      .skip(page);

    return users;
  }

  async contUsers(): Promise<number> {
    const length = await UserModel.countDocuments();

    return length;
  }

  async findById(id: string): Promise<User | null> {
    const user = await UserModel.findById(id);

    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await UserModel.findOne({ email });

    return user;
  }

  async create(data: CreateUserDto): Promise<User> {
    const user = await UserModel.create(data);

    return user;
  }

  async update(data: UpdateUserDto): Promise<User | null> {
    const user = await UserModel.findByIdAndUpdate(data._id, data, {
      new: true,
    });

    return user;
  }

  async delete(id: string): Promise<User | null> {
    const user = await UserModel.findByIdAndDelete(id);

    return user;
  }
}

export default UserRepository;
