import { root } from "postcss";

export const Paths = {
  Home: "/",
  SignUp: "/sign-up",
  SignIn: "/sign-in",
  Workspaces: {
    root: "/workspaces",
    id: (id: string) => `/workspaces/${id}`,
    edit: (id: string) => `/workspaces/${id}/edit`,
  },
  Projects: {
    root: "/projects",
    id: (id: string) => `/projects/${id}`,
    edit: (id: string) => `/projects/${id}/edit`,
  },
  Tasks: {
    root: "/tasks",
    new: `/tasks/new`,
    id: (id: string) => `/tasks/${id}`,
    edit: (id: string) => `/tasks/${id}/edit`,
  },
  Profile: {
    root: "/profile",
    edit: "/profile/edit",
    id: (id: string) => `/users/${id}`,
  },
} as const;
