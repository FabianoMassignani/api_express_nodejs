import { Router } from "express";
import asyncMethod from "../middlewares/asyncMethod";
import ProductController from "../controllers/productController";

export default class ProductRouter {
  private _router: Router;
  private _controller: ProductController;

  constructor(router: Router, controller: ProductController) {
    this._router = router;
    this._controller = controller;

    this._router.get("/getAll", asyncMethod(this._controller.getProducts));
    this._router.get("/", asyncMethod(this._controller.getProductById));
    this._router.post("/", asyncMethod(this._controller.createProduct));
    this._router.put("/:id", asyncMethod(this._controller.updateProduct));
    this._router.delete("/:id", asyncMethod(this._controller.deleteProduct));
  }

  get router() {
    return this._router;
  }
}
