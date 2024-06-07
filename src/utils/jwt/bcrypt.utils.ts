import { hashSync, compareSync } from "bcrypt";

export const hashPassword = (
  password: string,
  saltRounds: number = 10
): string => {
  return hashSync(password, saltRounds);
};

export const comparePasswords = (
  password: string,
  hashedPassword: string
): boolean => {
  return compareSync(password, hashedPassword);
};
