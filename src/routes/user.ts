import { Router } from "express";

import UserController from "../controllers/userController";
import UserRepository from "../repositorys/UserRepository";

import { handleAsyncMethod } from "../middlewares/handleAsyncMethod";

const userRepository = new UserRepository();
const userController = new UserController(userRepository);

const router: Router = Router();

router.post("/register", handleAsyncMethod(userController.register));
router.post("/login", handleAsyncMethod(userController.login));

export default router;
