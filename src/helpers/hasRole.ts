import { Roles } from "@/types/users.ts";

export const hasRole = (userRoles: string[] | undefined, roles: Roles[]): boolean => {
  if (!userRoles) return false;
  return userRoles.some(role => roles.includes(role.toUpperCase() as Roles));
};