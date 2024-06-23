import { Router } from "express";
import asyncMethod from "../middlewares/asyncMethod";
import ProductController from "../controllers/productController";
import authenticateToken from "../middlewares/authenticateToken";
import { checkRole } from "../middlewares/checkRole";
import { Roles } from "../interfaces/user/user.interface";

export default class ProductRouter {
  private router: Router;
  private controller: ProductController;

  constructor(router: Router, controller: ProductController) {
    this.router = router;
    this.controller = controller;

    this.router.get(
      "/getAll",
      [authenticateToken, checkRole([Roles.ADMIN, Roles.USER])],
      asyncMethod(this.controller.getAll)
    );
    this.router.get(
      "/getById/:id",
      [authenticateToken, checkRole([Roles.ADMIN, Roles.USER])],
      asyncMethod(this.controller.getById)
    );
    this.router.post(
      "/",
      [authenticateToken, checkRole([Roles.ADMIN, Roles.USER])],
      asyncMethod(this.controller.create)
    );
    this.router.put(
      "/",
      [authenticateToken, checkRole([Roles.ADMIN, Roles.USER])],
      asyncMethod(this.controller.update)
    );
    this.router.delete(
      "/:id",
      [authenticateToken, checkRole([Roles.ADMIN])],
      asyncMethod(this.controller.delete)
    );
  }

  get getRouter() {
    return this.router;
  }
}
