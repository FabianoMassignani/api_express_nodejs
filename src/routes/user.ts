import { Router } from "express";
import handleAsyncMethod from "../middlewares/handleAsyncMethod";

import UserController from "../controllers//userController";
import UserService from "../services/UserServices";
import UserRepository from "../repositorys/userRepository";

const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

const router: Router = Router();

router.post("/signUp", handleAsyncMethod(userController.signUp));
router.post("/signIn", handleAsyncMethod(userController.signIn));

export default router;
