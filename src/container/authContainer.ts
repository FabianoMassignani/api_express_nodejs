import { Router } from "express";
import AuthController from "../controllers/authController";
import AuthServices from "../services/AuthServices";
import UserRepository from "../repositorys/userRepository";
import AuthRouter from "../routes/authRouter";

export default class AuthContainer {
  public static get authRouter() {
    const userRepository = new UserRepository();
    const authService = new AuthServices(userRepository);
    const authController = new AuthController(authService);

    const authRouter = new AuthRouter(Router(), authController);

    return authRouter.getRouter;
  }
}
