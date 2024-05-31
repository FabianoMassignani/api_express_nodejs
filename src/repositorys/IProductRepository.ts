import {
  CreateProductsDto,
  UpdateProductDto,
} from "../interfaces/products/products.interface";
import { Product } from "../interfaces/products/products.interface";

export interface IProductRepository {
  findAll(): Promise<Product[]>;
  findById(id: string): Promise<Product | null>;
  create(data: CreateProductsDto): Promise<Product>;
  update(id: string, data: UpdateProductDto): Promise<Product | null>;
  delete(id: string): Promise<Product | null>;
}
