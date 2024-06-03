import { Request, Response } from "express";
import { BadRequestException } from "../exceptions/bad-request";
import { ErrorCode } from "../exceptions/root";
import { IUserRepository } from "../repositorys/IUserRepository";
import { NotFoundException } from "../exceptions/not-found";
import { CreateUserDto, UserLogin } from "../interfaces/user/user.interface";
import { hashSync, compareSync } from "bcrypt";
import { sign } from "jsonwebtoken";

class UserController {
  private userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  register = async (req: Request, res: Response): Promise<Response> => {
    const { email, password, name, active } = req.body;

    for (const key in req.body) {
      if (!req.body[key]) {
        throw new BadRequestException(
          "Parâmetros inválidos",
          ErrorCode.INVALID_PARAMS
        );
      }
    }

    const duplicateEmail = await this.userRepository.findByEmail(email);

    if (duplicateEmail) {
      throw new BadRequestException(
        "Email já cadastrado",
        ErrorCode.DUPLICATE_ENTRY
      );
    }

    const data: CreateUserDto = {
      name,
      email,
      password: hashSync(password, 10),
      active,
    };

    const user = await this.userRepository.create(data);

    return res.status(201).json({ data: user, message: "Criado com sucesso" });
  };

  login = async (req: Request, res: Response): Promise<Response> => {
    const { email, password } = req.body;

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

    const data = {
      id: user.id,
      name: user.name,
      email: user.email,
      active: user.active,
      accessToken: accessToken,
    } as UserLogin;

    return res.status(200).json(data);
  };
}

export default UserController;
