export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  ativo: boolean;
};

export type CreateUserDto = Omit<User, "id">;

export type UpdateUserDto = Partial<User>;
