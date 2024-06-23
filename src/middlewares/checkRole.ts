import { Request, Response, NextFunction } from "express";
import { Roles } from "../interfaces/user/user.interface";
import { JwtPayload } from "jsonwebtoken";
import UserService from "../services/UserServices";
import UserRepository from "../repositorys/userRepository";
import { NotFound, BadRequest } from "../exceptions";

interface AuthenticatedRequest extends Request {
  user?: JwtPayload;
}

export const checkRole = (roles: Array<Roles>) => {
  return async (
    req: AuthenticatedRequest,
    _res: Response,
    next: NextFunction
  ) => {
    const { user } = req;

    if (!user) throw new NotFound("Usuário no cabeçalho da requisição", 404);

    const { sub } = user;

    if (!sub)
      throw new NotFound("Id do usuário no cabeçalho da requisição", 404);

    const userService = new UserService(new UserRepository());

    try {
      const userRole = await userService.getById(sub);

      const rolesUser = userRole.role;

      const hasRole = roles.some((role) => rolesUser.includes(role));

      if (hasRole) {
        return next();
      }

      throw new BadRequest("Usuário não autorizado", 401);
    } catch (error) {
      next(error);
    }
  };
};

export default checkRole;
