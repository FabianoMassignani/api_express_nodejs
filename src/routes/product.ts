import { Router } from "express";
import { handleAsyncMethod } from "../middlewares/handleAsyncMethod";
import authenticate from "../middlewares/authenticateToken";

import ProductController from "../controllers/productController";
import ProductRepository from "../repositorys/ProductRepository";
import ProductService from "../services/ProductServices";

const productRepository = new ProductRepository();
const productService = new ProductService(productRepository);
const productController = new ProductController(productService);

const router: Router = Router();

router.use(authenticate);
router.get("/", handleAsyncMethod(productController.getProducts));
router.get("/getById/", handleAsyncMethod(productController.getProductById));
router.post("/", handleAsyncMethod(productController.createProduct));
router.put("/", handleAsyncMethod(productController.updateProduct));
router.delete("/", handleAsyncMethod(productController.deleteProduct));

export default router;
