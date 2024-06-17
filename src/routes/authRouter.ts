import { Router } from "express";
import asyncMethod from "../middlewares/asyncMethod";
import AuthController from "../controllers/authController";

export default class AuthRouter {
  private router: Router;
  private controller: AuthController;

  constructor(router: Router, controller: AuthController) {
    this.router = router;
    this.controller = controller;

    this.router.post("/signIn", asyncMethod(this.controller.signIn));
  }

  get getRouter() {
    return this.router;
  }
}
