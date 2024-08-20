import { sign } from "crypto";

export const Api = {
  auth: {
    signIn: "/api/auth/sign-in",
    signUp: "/api/auth/sign-up",
    signOut: "/api/auth/sign-out",
    user: "/api/auth/user",
  },
  workspaces: "/api/workspaces",
  workspace: (id: string) => `/api/workspaces/${id}`,
} as const;
