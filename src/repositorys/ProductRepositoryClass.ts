import { IProductRepository } from "../repositorys/IProductRepository";
import { ProductModel } from "../models/product.model";
import { Product } from "../interfaces/products.interface";
import { NotFoundException } from "../exceptions/not-found";
import { ErrorCode } from "../exceptions/root";
import {
  CreateProductsDto,
  UpdateProductDto,
} from "../interfaces/products.interface";

class ProductRepository implements IProductRepository {
  constructor() {}

  findAll(): Promise<Product[]> {
    const products = ProductModel.find();

    return products;
  }

  findById(id: string): Promise<Product | null> {
    const foundProduct = ProductModel.findById(id);

    if (!foundProduct) {
      throw new NotFoundException("Product not found", ErrorCode.NOT_FOUND);
    }

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

    if (!updatedProduct) {
      throw new NotFoundException("Product not found", ErrorCode.NOT_FOUND);
    }

    return updatedProduct;
  }

  delete(id: string): Promise<Product | null> {
    const deletedProduct = ProductModel.findByIdAndDelete(id);

    if (!deletedProduct) {
      throw new NotFoundException("Product not found", ErrorCode.NOT_FOUND);
    }

    return deletedProduct;
  }
}

export default ProductRepository;
