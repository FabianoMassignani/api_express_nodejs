import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { BadRequest, NotFound } from "../exceptions";
import { ErrorCode } from "../exceptions/root";

const authenticateToken = (
  request: Request,
  _response: Response,
  next: NextFunction
): Promise<any> | void => {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new NotFound("Token", ErrorCode.NOT_FOUND);
  }

  const [, token] = authHeader.split(" ");

  const user = verify(token, String(process.env.JWT_SECRET));

  if (user) return next();

  throw new BadRequest("Token inválido", ErrorCode.BAD_REQUEST);
};

export default authenticateToken;
