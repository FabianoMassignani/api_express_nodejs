import { Router } from "express";
import handleAsyncMethod from "../middlewares/handleAsyncMethod";

import UserController from "../controllers//userController";
import UserService from "../services/UserServices";
import UserRepository from "../repositorys/UserRepository";

const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

const router: Router = Router();

router.post("/register", handleAsyncMethod(userController.postUser));
router.post("/login", handleAsyncMethod(userController.postLogin));

export default router;
