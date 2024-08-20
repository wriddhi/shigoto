"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { Api } from "@/constants/endpoints";
import { Workspace } from "@/types/workspace";
import { TabId } from "../../page";
import { toast } from "sonner";
import { TOASTS } from "@/constants/toasts";
import CardsSkeleton from "@/components/CardsSkeleton";
import NoData from "@/components/NoData";
import { Button, Spinner } from "@nextui-org/react";
import { AiTwotoneDelete } from "react-icons/ai";
import { queryClient } from "@/providers";
import { ApiError } from "@/types/api-error";
import { PiLockSimpleOpenDuotone, PiLockSimpleDuotone } from "react-icons/pi";
import Link from "next/link";
import { Paths } from "@/constants/paths";

type TabContentProps = {
  setSelectedTab: (tabId: TabId) => void;
};

const timeDifferenceFromNow = (isoString: string): string => {
  const now = new Date();
  const pastDate = new Date(isoString);
  const diffInSeconds = Math.floor((now.getTime() - pastDate.getTime()) / 1000);

  const secondsInMinute = 60;
  const secondsInHour = secondsInMinute * 60;
  const secondsInDay = secondsInHour * 24;

  const days = Math.floor(diffInSeconds / secondsInDay);
  const hours = Math.floor((diffInSeconds % secondsInDay) / secondsInHour);
  const minutes = Math.floor((diffInSeconds % secondsInHour) / secondsInMinute);
  const seconds = diffInSeconds % secondsInMinute;

  let result = "";

  if (days > 0) {
    result += `${days} day${days !== 1 ? "s" : ""} `;
  }
  if (hours > 0) {
    result += `${hours} hour${hours !== 1 ? "s" : ""} `;
  }
  if (minutes > 0 && days === 0) {
    result += `${minutes} minute${minutes !== 1 ? "s" : ""} `;
  }
  if (seconds > 0 && days === 0 && hours === 0) {
    result += `${seconds} second${seconds !== 1 ? "s" : ""} `;
  }

  return result.trim() + " ago";
};

const WorkspaceCard = ({ workspace }: { workspace: Workspace }) => {
  return (
    <Link
      href={Paths.Workspaces.id(workspace.id)}
      className="p-4 md:aspect-video rounded-sm shadow-md outline outline-1 outline-default-300"
    >
      <span className="flex items-center gap-1">
        <p className="font-bold mr-auto">{workspace.name}</p>
        <p>
          {workspace.private ? (
            <PiLockSimpleDuotone className="text-success-400" />
          ) : (
            <PiLockSimpleOpenDuotone className="text-warning-400" />
          )}
        </p>
      </span>
      <p>{workspace.description}</p>
      <span>Created {timeDifferenceFromNow(workspace.created_at)}</span>
    </Link>
  );
};

export function View({ setSelectedTab }: TabContentProps) {
  const {
    data: workspaces,
    isFetching: isFetchingWorkspaces,
    isError,
    error,
  } = useQuery({
    queryKey: ["workspaces", "view"],
    queryFn: async ({ signal }) => {
      const { data } = await axios.get<Workspace[]>(Api.workspaces, { signal });
      return data;
    },
    initialData: [],
  });

  if (isError && error instanceof AxiosError) {
    toast.error(TOASTS.ERROR, {
      description: error.response?.data.message,
    });
  }

  if (isFetchingWorkspaces) {
    return <CardsSkeleton rows={2} cardsPerRow={4} />;
  }

  if (workspaces.length === 0) {
    return (
      <NoData
        title="You have no workspaces yet"
        action={
          <Button
            className="bg-black text-white"
            onClick={() => {
              setSelectedTab("create");
            }}
          >
            Create a workspace
          </Button>
        }
      />
    );
  }

  return (
    <div className="flex flex-col md:grid grid-cols-4 justify-between items-center p-4 gap-4">
      {[...workspaces, ...workspaces, ...workspaces, ...workspaces].map(
        (workspace) => (
          <WorkspaceCard key={workspace.id} workspace={workspace} />
        )
      )}
    </div>
  );
}
