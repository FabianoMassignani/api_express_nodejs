import { Router } from "express";
import asyncMethod from "../middlewares/asyncMethod";
import UserController from "../controllers/userController";

export default class UserRouter {
  private router: Router;
  private controller: UserController;

  constructor(router: Router, controller: UserController) {
    this.router = router;
    this.controller = controller;

    this.router.post("/signUp", asyncMethod(this.controller.signUp));
    this.router.delete("/", asyncMethod(this.controller.deleteUser));
  }

  get getRouter() {
    return this.router;
  }
}
