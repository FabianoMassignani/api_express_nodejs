import {
  CreateProductsDto,
  UpdateProductDto,
} from "../interfaces/products.interface";
import { Product } from "../interfaces/products.interface";

export interface IProductRepository {
  create(data: CreateProductsDto): Promise<Product>;
  findAll(): Promise<Product[]>;
  findById(id: string): Promise<Product | null>;
  update(id: string, data: UpdateProductDto): Promise<Product | null>;
  delete(id: string): Promise<Product | null>;
}
