import { model, Schema, Document } from "mongoose";
import { User } from "../interfaces/user/user.interface";

const userSchema: Schema = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: false,
    },
    cpf: {
      type: String,
      required: false,
    },
    cnpj: {
      type: String,
      required: false,
    },
    endereco: {
      type: String,
      required: false,
    },
    cep: {
      type: String,
      required: false,
    },
    cidade: {
      type: String,
      required: false,
    },
    estado: {
      type: String,
      required: false,
    },
    tags: {
      type: [String],
      required: false,
    },
    role: {
      type: [String],
      enum: ["USER", "ADMIN"],
      default: ["USER"],
      required: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export const UserModel = model<User & Document>("user", userSchema);
