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

    //this.router.use(authenticateToken);
    this.router.get("/getAll",authenticateToken, asyncMethod(this.controller.getProducts));
    this.router.get("/", asyncMethod(this.controller.getProductById));
    this.router.post("/", asyncMethod(this.controller.createProduct));
    this.router.put("/:id", asyncMethod(this.controller.updateProduct));
    this.router.delete("/:id", asyncMethod(this.controller.deleteProduct));
  }

  get getRouter() {
    return this.router;
  }
}
