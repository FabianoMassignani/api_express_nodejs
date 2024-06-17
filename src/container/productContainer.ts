import { Router } from "express";
import ProductController from "../controllers/productController";
import ProductService from "../services/ProductServices";
import ProductRepository from "../repositorys/productRepository";
import ProductRouter from "../routes/productRouter";

export default class ProductContainer {
  public static get productRouter() {
    const productRepository = new ProductRepository();
    const productService = new ProductService(productRepository);
    const productController = new ProductController(productService);

    const productRouter = new ProductRouter(Router(), productController);

    return productRouter.getRouter;
  }
}
