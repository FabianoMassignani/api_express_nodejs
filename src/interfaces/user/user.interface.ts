export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  active: boolean;
};

export type UserLogin = User & {
  accessToken: string;
};

export type CreateUserDto = Omit<User, "id">;

export type UpdateUserDto = Partial<User>;
