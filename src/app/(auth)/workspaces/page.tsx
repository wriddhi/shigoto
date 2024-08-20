"use client";

import { useState } from "react";
import Loader from "@/components/Loader";
import { Paths } from "@/constants/paths";
import { useAuth } from "@/providers/auth";
import { useRouter } from "next/navigation";
import { Tabs, Tab } from "@nextui-org/react";
import {
  PiStackDuotone,
  PiStackPlusDuotone,
  PiMagnifyingGlassDuotone,
} from "react-icons/pi";
import { View } from "./components/View";
import { Create } from "./components/Create";
import { Join } from "./components/Join";

const tabs = [
  {
    id: "view",
    label: "Your Workspaces",
    icon: PiStackDuotone,
    content: View,
  },
  {
    id: "create",
    label: "Create Workspace",
    icon: PiStackPlusDuotone,
    content: Create,
  },
  {
    id: "join",
    label: "Join Workspace",
    icon: PiMagnifyingGlassDuotone,
    content: Join,
  },
] as const;

const tabIds = tabs.map((tab) => tab.id);

export type TabId = (typeof tabIds)[number];

export default function Workspaces() {
  const { user, isFetchingUser } = useAuth();
  const router = useRouter();
  const [selectedTab, SetSelectedTab] = useState<TabId>("view");

  if (isFetchingUser) {
    return <Loader />;
  }

  if (!user) {
    return router.push(Paths.SignIn);
  }

  return (
    <main className="flex flex-col gap-4 p-4 overflow-y-auto w-full">
      <Tabs aria-label="Tabs" className="w-full" selectedKey={selectedTab}>
        {tabs.map((tab) => (
          <Tab
            className="flex-1 h-full"
            key={tab.id}
            title={
              <div
                onClick={() => {
                  SetSelectedTab(tab.id);
                }}
                className="flex items-center gap-2"
              >
                <tab.icon />
                <span>{tab.label}</span>
              </div>
            }
          >
            <tab.content setSelectedTab={SetSelectedTab} />
          </Tab>
        ))}
      </Tabs>
    </main>
  );
}
