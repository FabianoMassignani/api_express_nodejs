import { sign, SignOptions } from "jsonwebtoken";
import { BadRequestException } from "../exceptions/bad-request";
import { ErrorCode } from "../exceptions/root";

const JWT_SECRET = process.env.JWT_SECRET as string;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET não definido nas variáveis de ambiente");
}

export const generateToken = (
  payload: object,
  options?: SignOptions
): string => {
  try {
    const token = sign(payload, JWT_SECRET, {
      expiresIn: "1h",
      ...options,
    });

    return token;
  } catch (error) {
    throw new BadRequestException(
      "Erro ao gerar token",
      ErrorCode.INTERNAL_SERVER
    );
  }
};
