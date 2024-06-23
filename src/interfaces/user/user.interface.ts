export type User = {
  _id: string;
  username: string;
  email: string;
  password: string;
  role: Roles;
  active: boolean;
  accessToken: string;
};

export enum Roles {
  ADMIN = "ADMIN",
  USER = "USER",
}

export type UserLogin = Omit<User, "password">;

export type CreateUserDto = Omit<User, "_id" | "accessToken">;

export type UpdateUserDto = Partial<User>;
