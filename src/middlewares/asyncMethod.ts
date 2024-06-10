import { Request, Response, NextFunction } from "express";

const asyncMethod = (method: Function) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await method(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

export default asyncMethod;
