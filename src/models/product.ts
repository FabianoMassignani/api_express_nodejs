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
    estoque: {
      type: Number,
      required: true,
    },
    // Imposto sobre Circulação de Mercadorias e Serviços
    icms: {   
      type: Number,
      required: false,
    },
    fornecedor: {
      type: String,
      required: false,
    },
    marca: {
      type: String,
      required: false,
    },
    categoria: {
      type: String,
      required: false,
    },
    colecao: {
      type: String,
      required: false,
    },
    // Nomenclatura Comum do Mercosul
    ncm: {
      type: String,
      required: false,
    },
    barcode: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

export const ProductModel = model<Product & Document>("product", productSchema);
