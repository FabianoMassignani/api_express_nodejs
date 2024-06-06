import { hashPassword, comparePasswords, generateToken } from "../utils";
import { NotFound, BadRequest } from "../exceptions";
import { UserIRepository } from "../repositorys/userIRepository";
import { ErrorCode } from "../exceptions/root";
import {
  CreateUserDto,
  UserLogin,
  User,
} from "../interfaces/user/user.interface";

class UserService {
  private userRepository: UserIRepository;

  constructor(userRepository: UserIRepository) {
    this.userRepository = userRepository;
  }

  async create(data: CreateUserDto): Promise<User> {
    const { email, password, name, active } = data;

    if (!email) {
      throw new BadRequest("Email não informado", ErrorCode.BAD_REQUEST);
    }

    if (!password) {
      throw new BadRequest("Senha não informada", ErrorCode.BAD_REQUEST);
    }

    if (password.length < 6) {
      throw new BadRequest(
        "Senha deve conter no mínimo 6 caracteres",
        ErrorCode.BAD_REQUEST
      );
    }

    if (!name) {
      throw new BadRequest("Nome não informado", ErrorCode.BAD_REQUEST);
    }

    if (typeof active !== "boolean") {
      throw new BadRequest("Ativo não informado", ErrorCode.BAD_REQUEST);
    }

    const duplicateEmail = await this.userRepository.findByEmail(email);

    if (duplicateEmail) {
      throw new BadRequest("Email já cadastrado", ErrorCode.BAD_REQUEST);
    }

    data.password = hashPassword(password);

    const user = await this.userRepository.create(data);

    return user;
  }

  async login(email: string, password: string): Promise<UserLogin> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new NotFound("Usuário não encontrado", ErrorCode.NOT_FOUND);
    }

    const isValidPassword = comparePasswords(password, user.password);

    if (!isValidPassword) {
      throw new BadRequest("Senha inválida", ErrorCode.BAD_REQUEST);
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
