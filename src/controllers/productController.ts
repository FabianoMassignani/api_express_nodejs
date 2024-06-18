import { Request, Response } from "express";
import ProductService from "../services/ProductServices";

class ProductController {
  private productService: ProductService;

  constructor(productService: ProductService) {
    this.productService = productService;
  }

  getAll = async (req: Request, res: Response): Promise<Response> => {
    const { limit, skip } = req.query as { limit: string; skip: string };

    const products = await this.productService.getAll(limit, skip);

    return res.status(200).json({ data: products });
  };

  getById = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.query as { id: string };

    const product = await this.productService.getById(id);

    return res.status(200).json({ data: product });
  };

  create = async (req: Request, res: Response): Promise<Response> => {
    const productData = req.body;

    const productCreate = await this.productService.create(productData);

    return res
      .status(201)
      .json({ data: productCreate, message: "Criado com sucesso" });
  };

  update = async (req: Request, res: Response): Promise<Response> => {
    const id: string = req.params.id;
    const productData = req.body;

    const productUpdate = await this.productService.update(id, productData);

    return res
      .status(200)
      .json({ data: productUpdate, message: "Atualizado com sucesso" });
  };

  delete = async (req: Request, res: Response): Promise<Response> => {
    const id: string = req.params.id;

    const product = await this.productService.delete(id);

    return res
      .status(200)
      .json({ data: product, message: "Deletado com sucesso" });
  };
}

export default ProductController;
