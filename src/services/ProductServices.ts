import { NotFound, BadRequest } from "../exceptions";
import { ErrorCode } from "../exceptions/root";
import { ProductIRepository } from "../repositorys/productIRepository";
import {
  Product,
  UpdateProductDto,
  CreateProductDto,
} from "../interfaces/products/products.interface";

class ProductService {
  private productRepository: ProductIRepository;

  constructor(productRepository: ProductIRepository) {
    this.productRepository = productRepository;
  }

  async getAll(limit: string, skip: string): Promise<Product[]> {
    if (!limit) {
      throw new BadRequest("Limit não informado", ErrorCode.BAD_REQUEST);
    }

    if (!skip) {
      throw new BadRequest("Skip não informado", ErrorCode.BAD_REQUEST);
    }

    return await this.productRepository.findAll(Number(limit), Number(skip));
  }

  async getById(id: string): Promise<Product> {
    if (!id) {
      throw new BadRequest("Id não informado", ErrorCode.BAD_REQUEST);
    }

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      throw new BadRequest("Id inválido", ErrorCode.BAD_REQUEST);
    }

    const product = await this.productRepository.findById(id);

    if (!product) {
      throw new NotFound("Produto não encontrado", ErrorCode.NOT_FOUND);
    }

    return product;
  }

  async create(data: CreateProductDto): Promise<Product> {
    const { nome, preco, estoque } = data;

    if (!nome) {
      throw new BadRequest("Nome não informado", ErrorCode.BAD_REQUEST);
    }

    if (!preco) {
      throw new BadRequest("Preço não informado", ErrorCode.BAD_REQUEST);
    }

    if (!estoque) {
      throw new BadRequest("Estoque não informada", ErrorCode.BAD_REQUEST);
    }

    const product = await this.productRepository.create(data);

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

    const dataUpdate = { ...product, ...data };

    product = await this.productRepository.update(id, dataUpdate);

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
