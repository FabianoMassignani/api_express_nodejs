import { Router } from "express";
import handleAsyncMethod from "../middlewares/handleAsyncMethod";
import UserController from "../controllers/userController";

export default class UserRouter {
  private _router: Router;
  private _controller: UserController;

  constructor(router: Router, controller: UserController) {
    this._router = router;
    this._controller = controller;

    this._router.get("/signIn", handleAsyncMethod(this._controller.signIn));
    this._router.post("/signUp", handleAsyncMethod(this._controller.signUp));
  }

  get router() {
    return this._router;
  }
}
