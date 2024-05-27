import { Request, Response, NextFunction } from "express";
import { HttpException } from "../exceptions/root";

export const handleHttpException = (
  error: HttpException,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  res.status(error.statusCode).json({
    message: error.message,
    code: error.errorCode,
  });
};
