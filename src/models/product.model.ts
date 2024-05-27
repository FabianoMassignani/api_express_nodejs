import { model, Schema, Document } from "mongoose";
import { product } from "../interfaces/products.interface";

const productSchema: Schema = new Schema(
  {
    nome: {
      type: String,
      required: true,
      trim: true,
    },
    descricao: {
      type: String,
      required: true,
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

export const ProductModel = model<product & Document>("product", productSchema);
