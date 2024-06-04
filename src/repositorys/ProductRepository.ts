import { IProductRepository } from "./ProductIRepository";
import { Product } from "../interfaces/products/products.interface";
import { ProductModel } from "../models";

import {
  CreateProductsDto,
  UpdateProductDto,
} from "../interfaces/products/products.interface";

class ProductRepository implements IProductRepository {
  constructor() {}

  findAll(): Promise<Product[]> {
    const products = ProductModel.find();

    return products;
  }

  findById(id: string): Promise<Product | null> {
    const foundProduct = ProductModel.findById(id);

    return foundProduct;
  }

  create(data: CreateProductsDto): Promise<Product> {
    const newProduct = ProductModel.create(data);

    return newProduct;
  }

  update(id: string, data: UpdateProductDto): Promise<Product | null> {
    const updatedProduct = ProductModel.findByIdAndUpdate(id, data, {
      new: true,
    });

    return updatedProduct;
  }

  delete(id: string): Promise<Product | null> {
    const deletedProduct = ProductModel.findByIdAndDelete(id);

    return deletedProduct;
  }
}

export default ProductRepository;
