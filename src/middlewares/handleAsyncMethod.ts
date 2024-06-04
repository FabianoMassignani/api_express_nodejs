import { Request, Response, NextFunction } from "express";
import { InternalException } from "../exceptions";
import { ErrorCode, HttpException } from "../exceptions/root";

const asyncMethod = (method: Function) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await method(req, res, next);
    } catch (error) {
      let exception: HttpException;

      if (error instanceof HttpException) {
        exception = error;
      } else {
        console.error(error);

        exception = new InternalException(
          "Internal Server Error",
          ErrorCode.INTERNAL_SERVER,
          error
        );
      }

      next(exception);
    }
  };
};

export default asyncMethod;
