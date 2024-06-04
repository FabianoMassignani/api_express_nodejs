import { BadRequestException } from "../exceptions/bad-request";
import { NotFoundException } from "../exceptions/not-found";
import { ErrorCode } from "../exceptions/root";
import { IProductRepository } from "../repositorys/ProductIRepository";
import { Product } from "../interfaces/products/products.interface";

class ProductService {
  private productRepository: IProductRepository;

  constructor(productRepository: IProductRepository) {
    this.productRepository = productRepository;
  }

  async getAll(): Promise<Product[]> {
    return await this.productRepository.findAll();
  }

  async getById(id: string): Promise<Product> {
    if (!id) {
      throw new BadRequestException(
        "Id não informado",
        ErrorCode.INVALID_PARAMS
      );
    }

    const product = await this.productRepository.findById(id);

    if (!product) {
      throw new NotFoundException(
        "Produto não encontrado",
        ErrorCode.NOT_FOUND
      );
    }

    return product;
  }

  async create(productData: Partial<Product>): Promise<Product> {
    for (const key in productData) {
      if (!productData[key as keyof Product]) {
        throw new BadRequestException(
          `${key} não informado`,
          ErrorCode.INVALID_PARAMS
        );
      }
    }

    const product = await this.productRepository.create(productData as Product);

    if (!product) {
      throw new BadRequestException(
        "Produto não criado",
        ErrorCode.INVALID_PARAMS
      );
    }

    return product;
  }

  async update(id: string, productData: Partial<Product>): Promise<Product> {
    if (!id) {
      throw new BadRequestException(
        "Id não informado",
        ErrorCode.INVALID_PARAMS
      );
    }

    let product = await this.productRepository.findById(id);

    if (!product) {
      throw new NotFoundException(
        "Produto não encontrado",
        ErrorCode.NOT_FOUND
      );
    }

    for (const key in productData) {
      if (!productData[key as keyof Product]) {
        throw new BadRequestException(
          `${key} não informado`,
          ErrorCode.INVALID_PARAMS
        );
      }
    }

    product = await this.productRepository.update(id, productData);

    if (!product) {
      throw new NotFoundException(
        "Produto não atualizado",
        ErrorCode.NOT_FOUND
      );
    }

    return product;
  }

  async delete(id: string): Promise<Product> {
    if (!id) {
      throw new BadRequestException(
        "Id não informado",
        ErrorCode.INVALID_PARAMS
      );
    }

    const product = await this.productRepository.delete(id);

    if (!product) {
      throw new NotFoundException(
        "Produto não encontrado",
        ErrorCode.NOT_FOUND
      );
    }

    return product;
  }
}

export default ProductService;
