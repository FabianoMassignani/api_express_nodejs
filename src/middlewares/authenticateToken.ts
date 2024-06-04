import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { BadRequestException } from "../exceptions";
import { ErrorCode } from "../exceptions/root";

const authenticateToken = (
  request: Request,
  _response: Response,
  next: NextFunction
): Promise<any> | void => {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new BadRequestException(
      "Token não informado",
      ErrorCode.UNAUTHORIZED
    );
  }

  const [, token] = authHeader.split(" ");

  const user = verify(token, String(process.env.APP_SECRET));

  if (user) return next();

  throw new BadRequestException("Token inválido", ErrorCode.UNAUTHORIZED);
};

export default authenticateToken;
