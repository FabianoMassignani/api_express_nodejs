import { Request, Response, NextFunction } from "express";
import { BadRequestException } from "../exceptions/bad-request";
import { ErrorCode } from "../exceptions/root";
import { IProductRepository } from "../repositorys/IProductRepository";
import { NotFoundException } from "../exceptions/not-found";

class ProductController {
  private productRepository: IProductRepository;

  constructor(productRepository: IProductRepository) {
    this.productRepository = productRepository;
  }

  getProducts = async (_req: Request, res: Response): Promise<void> => {
    const products = await this.productRepository.findAll();

    res.status(200).json({ data: products });
  };

  getProductById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    if (!id) {
      throw new BadRequestException(
        "Id não informado",
        ErrorCode.INVALID_PARAMS
      );
    }

    const product = await this.productRepository.findById(id);

    res.status(200).json({ data: product });
  };

  createProduct = async (req: Request, res: Response): Promise<void> => {
    const { nome, descricao, preco, quantidade } = req.body;

    if (!nome) {
      throw new BadRequestException(
        "Nome não informado",
        ErrorCode.INVALID_PARAMS
      );
    }

    if (!descricao) {
      throw new BadRequestException(
        "Descrição não informada",
        ErrorCode.INVALID_PARAMS
      );
    }

    if (!preco) {
      throw new BadRequestException(
        "Preço não informado",
        ErrorCode.INVALID_PARAMS
      );
    }

    if (!quantidade) {
      throw new BadRequestException(
        "Quantidade não informada",
        ErrorCode.INVALID_PARAMS
      );
    }

    let product = {
      nome: nome,
      descricao: descricao,
      preco: preco,
      quantidade: quantidade,
    };

    const productCreate = await this.productRepository.create(product);

    res
      .status(201)
      .json({ data: productCreate, message: "Criado com sucesso" });
  };

  updateProduct = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { nome, descricao, preco, quantidade } = req.body;

    if (!id) {
      throw new BadRequestException(
        "Id não informado",
        ErrorCode.INVALID_PARAMS
      );
    }

    let product = await this.productRepository.findById(id);

    if (!product) {
      throw new NotFoundException("Product not found", ErrorCode.NOT_FOUND);
    }

    if (!nome) {
      throw new BadRequestException(
        "Nome não informado",
        ErrorCode.INVALID_PARAMS
      );
    }

    if (!descricao) {
      throw new BadRequestException(
        "Descrição não informada",
        ErrorCode.INVALID_PARAMS
      );
    }

    if (!preco) {
      throw new BadRequestException(
        "Preço não informado",
        ErrorCode.INVALID_PARAMS
      );
    }

    if (!quantidade) {
      throw new BadRequestException(
        "Quantidade não informada",
        ErrorCode.INVALID_PARAMS
      );
    }

    product = {
      nome: nome,
      descricao: descricao,
      preco: preco,
      quantidade: quantidade,
    };

    const productUpdate = await this.productRepository.update(id, product);

    res
      .status(200)
      .json({ data: productUpdate, message: "Atualizado com sucesso" });
  };

  deleteProduct = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    if (!id) {
      throw new BadRequestException(
        "Id não informado",
        ErrorCode.INVALID_PARAMS
      );
    }

    const product = await this.productRepository.delete(id);

    if (!product) {
      throw new NotFoundException("Product not found", ErrorCode.NOT_FOUND);
    }

    res.status(200).json({ data: product, message: "Deletado com sucesso" });
  };
}

export default ProductController;
