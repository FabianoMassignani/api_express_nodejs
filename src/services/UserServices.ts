import { hashSync, compareSync } from "bcrypt";
import { sign } from "jsonwebtoken";
import { BadRequestException } from "../exceptions/bad-request";
import { NotFoundException } from "../exceptions/not-found";
import { CreateUserDto, UserLogin } from "../interfaces/user/user.interface";
import { IUserRepository } from "../repositorys/UserIRepository";
import { ErrorCode } from "../exceptions/root";
import { User } from "../interfaces/user/user.interface";

class UserService {
  private userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  async createUser(data: CreateUserDto): Promise<User> {
    const { email, password, name, active } = data;

    const duplicateEmail = await this.userRepository.findByEmail(email);

    if (duplicateEmail) {
      throw new BadRequestException(
        "Email já cadastrado",
        ErrorCode.DUPLICATE_ENTRY
      );
    }

    data.password = hashSync(password, 10);

    const user = await this.userRepository.create(data);

    return user;
  }

  async loginUser(email: string, password: string): Promise<UserLogin> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new NotFoundException(
        "Usuário não encontrado",
        ErrorCode.NOT_FOUND
      );
    }

    const isValidPassword = compareSync(password, user.password);

    if (!isValidPassword) {
      throw new BadRequestException(
        "Senha inválida",
        ErrorCode.INVALID_PASSWORD
      );
    }

    const accessToken = sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "1min",
      }
    );

    if (!accessToken) {
      throw new BadRequestException(
        "Erro ao gerar token",
        ErrorCode.INTERNAL_SERVER
      );
    }

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
