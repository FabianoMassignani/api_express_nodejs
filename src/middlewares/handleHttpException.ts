import { Request, Response, NextFunction } from "express";
import { HttpException } from "../exceptions/root";

const handleHttpException = (
  error: HttpException,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  return res.status(error.statusCode).json({
    message: error.message,
    errorCode: error.errorCode,
  });
};

export default handleHttpException;
