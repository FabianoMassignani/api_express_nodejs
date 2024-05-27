import { Router } from "express";

import ProductController from "../controllers/productControllerClass";
import ProductRepository from "../repositorys/ProductRepositoryClass";
import { handleAsyncMethod } from "../middlewares/handleAsyncMethod";

const productRepository = new ProductRepository();
const productController = new ProductController(productRepository);
const router: Router = Router();

router.get("/", handleAsyncMethod(productController.getProducts));
router.get("/getById/:id", handleAsyncMethod(productController.getProductById));
router.post("/", handleAsyncMethod(productController.createProduct));
router.put("/:id", handleAsyncMethod(productController.updateProduct));
router.delete("/:id", handleAsyncMethod(productController.deleteProduct));

export default router;
