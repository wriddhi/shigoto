"use client";

import { MENU } from "@/constants/sidebar";
import { User } from "@/types/user";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Sidebar(): JSX.Element {
  const pathname = usePathname();
  const root = "/" + pathname.split("/")[1];

  const active = MENU.find((item) => item.href === root)?.title ?? "";

  return (
    <nav className="bg-slate-100 h-full py-4 border border-solid border-slate-200">
      <ul className="flex flex-col gap-2">
        {MENU.map((menu) => {
          return (
            <li key={menu.title}>
              <Link
                title={menu.title}
                data-active={menu.title === active}
                href={menu.href}
                className="hover:bg-white/70 flex flex-col items-center px-1 py-4 transition-all rounded-md group "
              >
                <menu.icon
                  data-active={menu.title === active}
                  className="text-xl group-hover:text-2xl text-black/60 data-[active='true']:text-black group-hover:text-black transition-all"
                />
                <span
                  data-active={menu.title === active}
                  className="text-xs text-black/60 data-[active='true']:text-black data-[active='true']:font-semibold group-hover:text-black"
                >
                  {menu.title}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
