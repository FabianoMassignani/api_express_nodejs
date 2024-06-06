import {
  CreateProduct,
  UpdateProduct,
} from "../interfaces/products/products.interface";
import { Product } from "../interfaces/products/products.interface";

export interface ProductIRepository {
  findAll(limit: number, skip: number): Promise<Product[]>;
  findById(id: string): Promise<Product | null>;
  create(data: CreateProduct): Promise<Product>;
  update(id: string, data: UpdateProduct): Promise<Product | null>;
  delete(id: string): Promise<Product | null>;
}
