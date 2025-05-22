import { auth } from "@clerk/nextjs/server";

export type Roles = 'admin' | 'user';

export const checkRole = async (role: Roles) => {
  const { sessionClaims } = await auth();
  return sessionClaims?.metadata?.role === role;
};

export const isAdmin = async () => {
  return await checkRole('admin');
};

export const isUser = async () => {
  return await checkRole('user');
};
