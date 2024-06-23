import { sign, SignOptions } from "jsonwebtoken";
import { BadRequest } from "../../exceptions/bad-request";
import { ErrorCode } from "../../exceptions/root";
import { JWT_SECRET, JWT_EXPIRATION } from "../../config/secrets";

export const generateToken = (
  payload: object,
  options?: SignOptions
): string => {
  try {
    const token = sign(payload, JWT_SECRET, {
      expiresIn: JWT_EXPIRATION,
      ...options,
    });

    return token;
  } catch (error) {
    throw new BadRequest("Erro ao gerar token", ErrorCode.BAD_REQUEST);
  }
};
