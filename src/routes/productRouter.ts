import { Router } from "express";
import asyncMethod from "../middlewares/asyncMethod";
import ProductController from "../controllers/productController";
import authenticateToken from "../middlewares/authenticateToken";

export default class ProductRouter {
  private router: Router;
  private controller: ProductController;

  constructor(router: Router, controller: ProductController) {
    this.router = router;
    this.controller = controller;

    this.router.use(authenticateToken);
    this.router.get("/getAll", asyncMethod(this.controller.getAll));
    this.router.get("/", asyncMethod(this.controller.getById));
    this.router.post("/", asyncMethod(this.controller.create));
    this.router.put("/:id", asyncMethod(this.controller.update));
    this.router.delete("/:id", asyncMethod(this.controller.delete));
  }

  get getRouter() {
    return this.router;
  }
}
