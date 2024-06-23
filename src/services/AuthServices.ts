import { NotFound, BadRequest } from "../exceptions";
import { UserIRepository } from "../repositorys/userIRepository";
import { ErrorCode } from "../exceptions/root";
import { comparePasswords, generateToken } from "../utils";
import { UserLogin } from "../interfaces/user/user.interface";

class AuthServices {
  private userRepository: UserIRepository;

  constructor(userRepository: UserIRepository) {
    this.userRepository = userRepository;
  }

  async login(email: string, password: string): Promise<UserLogin> {
    if (!email) {
      throw new BadRequest("Email não informado", ErrorCode.BAD_REQUEST);
    }

    if (!password) {
      throw new BadRequest("Senha não informada", ErrorCode.BAD_REQUEST);
    }

    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new NotFound("Usuário", ErrorCode.NOT_FOUND);
    }

    const isValidPassword = comparePasswords(password, user.password);

    if (!isValidPassword) {
      throw new BadRequest("Senha inválida", ErrorCode.BAD_REQUEST);
    }

    const accessToken = generateToken({
      sub: user._id,
      username: user.username,
    });

    const data: UserLogin = {
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      active: user.active,
      accessToken: accessToken,
    };

    return data;
  }
}

export default AuthServices;
