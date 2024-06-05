import { NotFound, BadRequest } from "../exceptions";
import { ErrorCode } from "../exceptions/root";
import { ProductIRepository } from "../repositorys/productIRepository";
import { Product } from "../interfaces/products/products.interface";

class ProductService {
  private productRepository: ProductIRepository;

  constructor(productRepository: ProductIRepository) {
    this.productRepository = productRepository;
  }

  async getAll(limit: number, skip: number): Promise<Product[]> {
    if (!limit) {
      throw new BadRequest("Limit não informado", ErrorCode.BAD_REQUEST);
    }

    if (!skip) {
      throw new BadRequest("Skip não informado", ErrorCode.BAD_REQUEST);
    }

    return await this.productRepository.findAll(limit, skip);
  }

  async getById(id: string): Promise<Product> {
    if (!id) {
      throw new BadRequest("Id não informado", ErrorCode.BAD_REQUEST);
    }

    const product = await this.productRepository.findById(id);

    if (!product) {
      throw new NotFound("Produto não encontrado", ErrorCode.NOT_FOUND);
    }

    return product;
  }

  async create(productData: Partial<Product>): Promise<Product> {
    for (const key in productData) {
      if (!productData[key as keyof Product]) {
        throw new BadRequest(`${key} não informado`, ErrorCode.BAD_REQUEST);
      }
    }

    const product = await this.productRepository.create(productData as Product);

    if (!product) {
      throw new BadRequest("Produto não criado", ErrorCode.BAD_REQUEST);
    }

    return product;
  }

  async update(id: string, productData: Partial<Product>): Promise<Product> {
    if (!id) {
      throw new BadRequest("Id não informado", ErrorCode.BAD_REQUEST);
    }

    let product = await this.productRepository.findById(id);

    if (!product) {
      throw new NotFound("Produto não encontrado", ErrorCode.NOT_FOUND);
    }

    for (const key in productData) {
      if (!productData[key as keyof Product]) {
        throw new BadRequest(`${key} não informado`, ErrorCode.BAD_REQUEST);
      }
    }

    product = await this.productRepository.update(id, productData);

    if (!product) {
      throw new NotFound("Produto não atualizado", ErrorCode.NOT_FOUND);
    }

    return product;
  }

  async delete(id: string): Promise<Product> {
    if (!id) {
      throw new BadRequest("Id não informado", ErrorCode.BAD_REQUEST);
    }

    const product = await this.productRepository.delete(id);

    if (!product) {
      throw new NotFound("Produto não encontrado", ErrorCode.NOT_FOUND);
    }

    return product;
  }
}

export default ProductService;
