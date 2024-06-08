import { model, Schema, Document } from "mongoose";
import { Product } from "../interfaces/products/products.interface";

const productSchema: Schema = new Schema(
  {
    nome: {
      type: String,
      required: true,
      trim: true,
    },
    descricao: {
      type: String,
      required: false,
      trim: true,
    },
    preco: {
      type: Number,
      required: true,
    },
    quantidade: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const ProductModel = model<Product & Document>("product", productSchema);
