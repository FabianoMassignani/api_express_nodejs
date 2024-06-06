import { NotFound, BadRequest } from "../exceptions";
import { ErrorCode } from "../exceptions/root";
import { ProductIRepository } from "../repositorys/productIRepository";
import {
  Product,
  UpdateProductDto,
} from "../interfaces/products/products.interface";

class ProductService {
  private productRepository: ProductIRepository;

  constructor(productRepository: ProductIRepository) {
    this.productRepository = productRepository;
  }

  async getAll(limit: string, skip: string): Promise<Product[]> {
    if (isNaN(Number(limit))) {
      throw new BadRequest("Limit não informado", ErrorCode.BAD_REQUEST);
    }

    if (isNaN(Number(skip))) {
      throw new BadRequest("Skip não informado", ErrorCode.BAD_REQUEST);
    }

    return await this.productRepository.findAll(Number(limit), Number(skip));
  }

  async getById(id: string): Promise<Product> {
    if (typeof id !== "string") {
      throw new BadRequest("Id não informado", ErrorCode.BAD_REQUEST);
    }

    if (!id) {
      throw new BadRequest("Id não informado", ErrorCode.BAD_REQUEST);
    }

    const product = await this.productRepository.findById(id);

    if (!product) {
      throw new NotFound("Produto não encontrado", ErrorCode.NOT_FOUND);
    }

    return product;
  }

  async create(data: Partial<Product>): Promise<Product> {
    if (!data) {
      throw new BadRequest("Dados não informados", ErrorCode.BAD_REQUEST);
    }

    const product = await this.productRepository.create(data as Product);

    if (!product) {
      throw new BadRequest("Produto não criado", ErrorCode.BAD_REQUEST);
    }

    return product;
  }

  async update(id: string, data: UpdateProductDto): Promise<Product> {
    if (!id) {
      throw new BadRequest("Id não informado", ErrorCode.BAD_REQUEST);
    }

    let product = await this.productRepository.findById(id);

    if (!product) {
      throw new NotFound("Produto não encontrado", ErrorCode.NOT_FOUND);
    }

    if (!data) {
      throw new BadRequest("Dados não informados", ErrorCode.BAD_REQUEST);
    }

    product = await this.productRepository.update(id, data);

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
