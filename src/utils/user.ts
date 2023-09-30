import type { User } from "@/types/user";

export const getUserProfileUrl = (userId: User["userId"]): string => {
  return `/users/${userId}`;
};
