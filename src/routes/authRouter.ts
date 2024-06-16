import { Router } from "express";
import asyncMethod from "../middlewares/asyncMethod";
import AuthController from "../controllers/authController";

export default class AuthRouter {
  private _router: Router;
  private _controller: AuthController;

  constructor(router: Router, controller: AuthController) {
    this._router = router;
    this._controller = controller;

    this._router.post("/signIn", asyncMethod(this._controller.signIn));
  }

  get router() {
    return this._router;
  }
}
