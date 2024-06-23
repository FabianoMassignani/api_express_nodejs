import dotenv from "dotenv";

dotenv.config({
  path: ".env",
});

export const PORT = process.env.PORT;
export const JWT_SECRET = process.env.JWT_SECRET as string;
export const JWT_EXPIRATION = process.env.JWT_EXPIRATION as string;
export const MONGO_URI = process.env.MONGO_URI as string;
export const MONGO_URI_TEST = process.env.MONGO_URI_TEST as string;
export const NODE_ENV = process.env.NODE_ENV as string;