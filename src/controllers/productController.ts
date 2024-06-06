import { Request, Response } from "express";
import ProductService from "../services/ProductServices";

class ProductController {
  private productService: ProductService;

  constructor(productService: ProductService) {
    this.productService = productService;
  }

  getProducts = async (req: Request, res: Response): Promise<Response> => {
    const { query } = req;

    const products = await this.productService.getAll(query);

    return res.status(200).json({ data: products });
  };

  getProductById = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;

    const product = await this.productService.getById(id);

    return res.status(200).json({ data: product });
  };

  createProduct = async (req: Request, res: Response): Promise<Response> => {
    const productData = req.body;

    const productCreate = await this.productService.create(productData);

    return res
      .status(201)
      .json({ data: productCreate, message: "Criado com sucesso" });
  };

  updateProduct = async (req: Request, res: Response): Promise<Response> => {
    const id: string = req.params.id;
    const productData = req.body;

    const productUpdate = await this.productService.update(id, productData);

    return res
      .status(200)
      .json({ data: productUpdate, message: "Atualizado com sucesso" });
  };

  deleteProduct = async (req: Request, res: Response): Promise<Response> => {
    const id: string = req.params.id;

    const product = await this.productService.delete(id);

    return res
      .status(200)
      .json({ data: product, message: "Deletado com sucesso" });
  };
}

export default ProductController;
