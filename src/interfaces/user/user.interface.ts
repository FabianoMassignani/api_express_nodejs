export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  active: boolean;
  accessToken: string;
};

export type UserLogin = Omit<User, "id" | "password">;

export type CreateUser = Omit<User, "id" | "accessToken">;

export type UpdateUser = Partial<User>;
