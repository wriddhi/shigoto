import { User } from "./user";

export type Workspace = {
  id: string;
  created_at: string;
  name: string;
  description: string;
  owner: string;
  info: string;
  members: string[];
  permissions: Record<string, WorkspacePermissions>;
  private: boolean;
};

export const WorkspaceMutableProperties = [
  "info",
  "description",
  "name",
  "private",
  "permissions",
  "members",
] satisfies (keyof Workspace)[];

type WorkspacePropertiesType = (typeof WorkspaceMutableProperties)[number];

const Actions = ["edit", "delete"] as const;

export type ActionsType = (typeof Actions)[number];

export type WorkspacePermissions = Record<
  WorkspacePropertiesType,
  (typeof Actions)[number][]
>;

export const actions = {
  can(user: User, action: ActionsType, workspace: Workspace, property: WorkspacePropertiesType) {
    if (user.id === workspace.owner) {
      return true;
    }

    if (workspace.permissions[user.id][property].includes(action)) {
      return true;
    }

    return false;
  }
}