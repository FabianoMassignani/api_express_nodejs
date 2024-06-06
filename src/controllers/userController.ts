import { Request, Response } from "express";
import { CreateUserDto } from "../interfaces/user/user.interface";
import UserService from "../services/UserServices";

class UserController {
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  postUser = async (req: Request, res: Response): Promise<Response> => {
    const { email, password, name, active } = req.body;

    const data: CreateUserDto = { email, password, name, active };

    const user = await this.userService.signUp(data);

    return res.status(201).json({ data: user, message: "Criado com sucesso" });
  };

  postLogin = async (req: Request, res: Response): Promise<Response> => {
    const { email, password } = req.body;

    const user = await this.userService.signIn(email, password);

    return res.status(200).json(user);
  };
}

export default UserController;
