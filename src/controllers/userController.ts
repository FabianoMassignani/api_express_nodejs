import { Request, Response } from "express";
import UserService from "../services/UserServices";

class UserController {
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  register = async (req: Request, res: Response): Promise<Response> => {
    const { body } = req;

    const user = await this.userService.create(body);

    return res.status(201).json({ data: user, message: "Criado com sucesso" });
  };

  getAll = async (req: Request, res: Response): Promise<Response> => {
    const users = await this.userService.getAll();

    return res.status(200).json({ data: users });
  };

  update = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const { body } = req;

    const user = await this.userService.update(id, body);

    return res.status(201).json({ data: user, message: "Editado com sucesso" });
  };

  delete = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;

    await this.userService.delete(id);

    return res.status(201).json();
  };
}

export default UserController;
