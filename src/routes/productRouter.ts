import { Router } from "express";
import handleAsyncMethod from "../middlewares/handleAsyncMethod";
import ProductController from "../controllers/productController";

export default class ProductRouter {
  private _router: Router;
  private _controller: ProductController;

  constructor(router: Router, controller: ProductController) {
    this._router = router;
    this._controller = controller;

    this._router.get(
      "/products",
      handleAsyncMethod(this._controller.getProducts)
    );
    this._router.post(
      "/products",
      handleAsyncMethod(this._controller.createProduct)
    );
    this._router.put(
      "/products/:id",
      handleAsyncMethod(this._controller.updateProduct)
    );
    this._router.delete(
      "/products/:id",
      handleAsyncMethod(this._controller.deleteProduct)
    );
  }

  get router() {
    return this._router;
  }
}
