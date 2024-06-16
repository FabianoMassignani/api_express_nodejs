export type User = {
  id: string;
  username: string;
  email: string;
  password: string;
  role: string;
  active: boolean;
  accessToken: string;
};

export type UserLogin = Omit<User, "id" | "password">;

export type CreateUserDto = Omit<User, "id" | "accessToken">;

export type UpdateUserDto = Partial<User>;
