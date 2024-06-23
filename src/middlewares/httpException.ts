import { Request, Response, NextFunction } from "express";
import { InternalException } from "../exceptions";
import { ErrorCode, HttpException } from "../exceptions/root";

const handleHttpException = (
  error: HttpException | Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  let exception: HttpException;

  if (error instanceof HttpException) {
    exception = error;
  } else {
    console.error(error);

    exception = new InternalException(
      "Erro interno do servidor.",
      ErrorCode.INTERNAL_SERVER,
      error
    );
  }

  return res.status(exception.statusCode).json({
    message: exception.message,
    errorCode: exception.errorCode,
  });
};

export default handleHttpException;
