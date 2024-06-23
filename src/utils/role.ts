import { Roles } from "../interfaces/user/user.interface";

export const verifyRole = (role: String): boolean => {
  if (role === Roles.ADMIN || role === Roles.USER) {
    return true;
  }
  return false;
};
