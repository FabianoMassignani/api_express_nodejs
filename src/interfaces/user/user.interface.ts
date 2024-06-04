export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  active: boolean;
  accessToken: string;
};

export type UserLogin = Omit<User, "id" | "password">;

export type CreateUserDto = Omit<User, "id" | "accessToken">;

export type UpdateUserDto = Partial<User>;
