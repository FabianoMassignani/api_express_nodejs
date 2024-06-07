export enum Role {
  Manager = "manager",
  Client = "client",
}

export const verifyRole = (role: string): boolean => {
  return Object.values(Role).includes(role as Role);
};
