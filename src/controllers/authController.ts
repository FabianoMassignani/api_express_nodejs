import { Request, Response } from "express";
import AuthServices from "../services/AuthServices";

class AuthController {
  private authService: AuthServices;

  constructor(authService: AuthServices) {
    this.authService = authService;
  }

  signIn = async (req: Request, res: Response): Promise<Response> => {
    const { email, password } = req.body;

    const user = await this.authService.login(email, password);

    return res.status(201).json(user);
  };
}

export default AuthController;
