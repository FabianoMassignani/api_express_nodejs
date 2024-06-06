import {
  CreateProductDto,
  UpdateProductDto,
} from "../interfaces/products/products.interface";
import { Product } from "../interfaces/products/products.interface";

export interface ProductIRepository {
  findAll(limit: number, skip: number): Promise<Product[]>;
  findById(id: string): Promise<Product | null>;
  create(data: CreateProductDto): Promise<Product>;
  update(id: string, data: UpdateProductDto): Promise<Product | null>;
  delete(id: string): Promise<Product | null>;
}
