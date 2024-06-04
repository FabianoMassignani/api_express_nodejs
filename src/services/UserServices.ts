import { hashPassword, comparePasswords, generateToken } from "../utils/";
import { NotFoundException, BadRequestException } from "../exceptions";
import {
  CreateUserDto,
  UserLogin,
  User,
} from "../interfaces/user/user.interface";
import { IUserRepository } from "../repositorys/UserIRepository";
import { ErrorCode } from "../exceptions/root";

class UserService {
  private userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  async create(data: CreateUserDto): Promise<User> {
    const { email, password, name, active } = data;

    if (password.length < 6) {
      throw new BadRequestException(
        "Senha deve conter no mínimo 6 caracteres",
        ErrorCode.INVALID_PARAMS
      );
    }

    const duplicateEmail = await this.userRepository.findByEmail(email);

    if (duplicateEmail) {
      throw new BadRequestException(
        "Email já cadastrado",
        ErrorCode.DUPLICATE_ENTRY
      );
    }

    data.password = hashPassword(password);

    const user = await this.userRepository.create(data);

    return user;
  }

  async login(email: string, password: string): Promise<UserLogin> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new NotFoundException(
        "Usuário não encontrado",
        ErrorCode.NOT_FOUND
      );
    }

    const isValidPassword = comparePasswords(password, user.password);

    if (!isValidPassword) {
      throw new BadRequestException(
        "Senha inválida",
        ErrorCode.INVALID_PASSWORD
      );
    }

    const accessToken = generateToken({
      id: user.id,
      email: user.email,
    });

    const data: UserLogin = {
      name: user.name,
      email: user.email,
      active: user.active,
      accessToken: accessToken,
    };

    return data;
  }
}

export default UserService;
