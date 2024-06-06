import { Request, Response } from "express";
import UserService from "../services/UserServices";

class UserController {
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  signUp = async (req: Request, res: Response): Promise<Response> => {
    const { body } = req;

    const user = await this.userService.create(body);

    return res.status(201).json({ data: user, message: "Criado com sucesso" });
  };

  signIn = async (req: Request, res: Response): Promise<Response> => {
    const { email, password } = req.body;

    const user = await this.userService.login(email, password);

    return res.status(200).json(user);
  };
}

export default UserController;
