import { Router } from "express";
import UserController from "../controllers/userController";
import UserService from "../services/UserServices";
import UserRepository from "../repositorys/userRepository";
import UserRouter from "../routes/userRouter";

export default class UserContainer {
  public static get userRouter() {
    const userRepository = new UserRepository();
    const userService = new UserService(userRepository);
    const userController = new UserController(userService);

    const userRouter = new UserRouter(Router(), userController);

    return userRouter.getRouter;
  }
}
