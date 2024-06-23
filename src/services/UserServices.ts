import { NotFound, BadRequest } from "../exceptions";
import { UserIRepository } from "../repositorys/userIRepository";
import { ErrorCode } from "../exceptions/root";
import {
  hashPassword,
  comparePasswords,
  generateToken,
  verifyRole,
} from "../utils";
import {
  CreateUserDto,
  UpdateUserDto,
  UserLogin,
  User,
} from "../interfaces/user/user.interface";

class UserService {
  private userRepository: UserIRepository;

  constructor(userRepository: UserIRepository) {
    this.userRepository = userRepository;
  }

  async getById(id: string): Promise<User> {
    if (!id) {
      throw new BadRequest("Id não informado", ErrorCode.BAD_REQUEST);
    }

    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new NotFound("Usuário", ErrorCode.NOT_FOUND);
    }

    return user;
  }

  async getAll(
    limit: string,
    page: string,
    search: string
  ): Promise<{ users: User[]; total: number }> {
    if (!limit) {
      throw new BadRequest("Limit não informado", ErrorCode.BAD_REQUEST);
    }

    if (!page) {
      throw new BadRequest("Page não informado", ErrorCode.BAD_REQUEST);
    }

    const users = await this.userRepository.getAll(
      parseInt(limit),
      parseInt(page),
      search
    );

    const total = await this.userRepository.contUsers();

    return { users, total };
  }

  async create(data: CreateUserDto): Promise<User> {
    const { email, password, username, active = true, role } = data;

    if (!username) {
      throw new BadRequest("Nome não informado", ErrorCode.BAD_REQUEST);
    }

    if (!email) {
      throw new BadRequest("Email não informado", ErrorCode.BAD_REQUEST);
    }

    if (!password) {
      throw new BadRequest("Senha não informada", ErrorCode.BAD_REQUEST);
    }

    if (!role.length) {
      throw new BadRequest("Papel não informado", ErrorCode.BAD_REQUEST);
    }

    for (const r of role) {
      if (!verifyRole(r))
        throw new BadRequest("Papel não permitido", ErrorCode.BAD_REQUEST);
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

  async update(data: UpdateUserDto): Promise<User> {
    const { _id } = data;

    if (!_id) {
      throw new BadRequest("Id não informado", ErrorCode.BAD_REQUEST);
    }

    const user = await this.userRepository.findById(_id);

    if (!user) {
      throw new NotFound("Usuário", ErrorCode.NOT_FOUND);
    }

    const { email, username, active, role } = data;

    if (!username) {
      throw new BadRequest("Nome não informado", ErrorCode.BAD_REQUEST);
    }

    if (!email) {
      throw new BadRequest("Email não informado", ErrorCode.BAD_REQUEST);
    }

    if (!role) {
      throw new BadRequest("Papel não informado", ErrorCode.BAD_REQUEST);
    }

    if (!role.length) {
      throw new BadRequest("Papel não informado", ErrorCode.BAD_REQUEST);
    }

    for (const r of role) {
      if (!verifyRole(r))
        throw new BadRequest("Papel não permitido", ErrorCode.BAD_REQUEST);
    }

    if (typeof active !== "boolean") {
      throw new BadRequest("Ativo não informado", ErrorCode.BAD_REQUEST);
    }

    const userUpdate = await this.userRepository.update(data);

    if (!userUpdate) {
      throw new NotFound("Usuário", ErrorCode.NOT_FOUND);
    }

    return userUpdate;
  }

  async delete(id: string): Promise<User> {
    if (!id) {
      throw new BadRequest("Id não informado", ErrorCode.BAD_REQUEST);
    }

    const user = await this.userRepository.delete(id);

    if (!user) {
      throw new NotFound("Usuário", ErrorCode.NOT_FOUND);
    }

    return user;
  }
}

export default UserService;
