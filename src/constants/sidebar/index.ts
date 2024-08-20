import type { MenuItem } from "@/types/menu";
import {
  PiBuildingsDuotone,
  PiTicketDuotone,
  PiCompassDuotone,
} from "react-icons/pi";

export const MENU: MenuItem[] = [
  {
    title: "Workspaces",
    href: "/workspaces",
    icon: PiBuildingsDuotone,
  },
  {
    title: "Tickets",
    href: "/tickets",
    icon: PiTicketDuotone,
  },
  {
    title: "Explore",
    href: "/explore",
    icon: PiCompassDuotone,
  },
] as const;
