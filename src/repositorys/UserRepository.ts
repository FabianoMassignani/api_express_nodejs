import { UserModel } from "../models/user.model";
import { CreateUserDto } from "../interfaces/user/user.interface";
import { IUserRepository } from "./IUserRepository";
import { User } from "../interfaces/user/user.interface";

class UserRepository implements IUserRepository {
  constructor() {}

  async create(data: CreateUserDto): Promise<User> {
    const newUser = UserModel.create(data);

    return newUser;
  }
}

export default UserRepository;
