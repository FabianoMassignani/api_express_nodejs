import { Router } from "express";
import asyncMethod from "../middlewares/handleAsyncMethod";
import authenticate from "../middlewares/authenticateToken";

import ProductController from "../controllers/productController";
import ProductRepository from "../repositorys/productRepository";
import ProductService from "../services/ProductServices";

const productRepository = new ProductRepository();
const productService = new ProductService(productRepository);
const productController = new ProductController(productService);

const router: Router = Router();

// router.use(asyncMethod(authenticate));
router.get("/", asyncMethod(productController.getProducts));
router.get("/getById/", asyncMethod(productController.getProductById));
router.post("/", asyncMethod(productController.createProduct));
router.put("/", asyncMethod(productController.updateProduct));
router.delete("/", asyncMethod(productController.deleteProduct));

export default router;
