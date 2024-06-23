import { Request, Response, NextFunction } from "express";
import { verify, JwtPayload, TokenExpiredError } from "jsonwebtoken";
import { NotUnauthorized, NotFound } from "../exceptions";
import { ErrorCode } from "../exceptions/root";

interface AuthenticatedRequest extends Request {
  user?: JwtPayload;
}

const authenticateToken = (
  request: AuthenticatedRequest,
  _response: Response,
  next: NextFunction
): Promise<any> | void => {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new NotFound("Token", ErrorCode.NOT_FOUND);
  }

  const [, token] = authHeader.split(" ");

  try {
    const user = verify(token, String(process.env.JWT_SECRET));

    if (user) {
      request.user = user as JwtPayload;

      return next();
    }
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      next(new NotUnauthorized("Token expirado", ErrorCode.UNAUTHORIZED));
    } else {
      next(error);
    }
  }
};

export default authenticateToken;
