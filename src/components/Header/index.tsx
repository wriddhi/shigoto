"use client";

import { useAuth } from "@/providers/auth";
import {
  Avatar,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  User,
  Button,
  DropdownSection,
  Skeleton,
} from "@nextui-org/react";
import { usePathname } from "next/navigation";
import { MENU } from "@/constants/sidebar";

export default function Header() {
  const { user, signOut, isSigningOut } = useAuth();
  const pathname = usePathname();
  const root = "/" + pathname.split("/")[1];

  const title = MENU.find((item) => item.href === root)?.title ?? "Loading...";

  return (
    <header className="w-full border border-solid border-slate-200 p-4 md:px-4 flex justify-start items-center">
      <h3 className="font-serif mr-auto font-semibold hidden md:flex">
        {title}.
      </h3>
      <h6 className="font-serif mr-auto font-semibold flex md:hidden">
        {title}.
      </h6>
      {user ? (
        <Dropdown>
          <DropdownTrigger>
            <Button
              className="flex justify-end px-0 hover:bg-white"
              variant="light"
            >
              <User
                className="hidden md:flex"
                name={user.name}
                description={"@" + user.username}
                avatarProps={{
                  src:
                    user.avatar ??
                    `https://api.dicebear.com/9.x/lorelei/svg?seed=${user.username}`,
                }}
              />
              <Avatar
                src={
                  user.avatar ??
                  `https://api.dicebear.com/9.x/lorelei/svg?seed=${user.username}`
                }
                className="md:hidden p-0 m-0"
              />
            </Button>
          </DropdownTrigger>
          <DropdownMenu>
            <DropdownSection title="Your Account" showDivider>
              <DropdownItem href="/profile">Profile</DropdownItem>
              <DropdownItem href="/settings">Settings</DropdownItem>
            </DropdownSection>
            <DropdownSection title="Actions">
              <DropdownItem>
                <Button
                  className="bg-black text-white font-serif w-full"
                  type="button"
                  radius="sm"
                  isLoading={isSigningOut}
                  onClick={signOut}
                >
                  {isSigningOut ? "Signing out ->" : "Sign out ->"}
                </Button>
              </DropdownItem>
            </DropdownSection>
          </DropdownMenu>
        </Dropdown>
      ) : (
        <>
          <Skeleton className="w-10 h-10 rounded-full" />
          <div className="flex flex-col gap-1 ml-2">
            <Skeleton className="w-28 h-4 rounded-xl" />
            <Skeleton className="w-20 h-4 rounded-xl" />
          </div>
        </>
      )}
    </header>
  );
}
