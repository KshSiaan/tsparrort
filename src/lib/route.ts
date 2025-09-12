import { IconUsers } from "@tabler/icons-react";
import {
  Banknote,
  LayoutDashboardIcon,
  PopcornIcon,
  SlidersHorizontalIcon,
} from "lucide-react";
const ADMIN_PREFIX = "/admin"
export const route = {
  user: {
    name: "Admin",
    email: "admin@gmail.com",
    avatar: "/image/logo.webp",
  },
  navMain: [
    {
      title: "Dashboard",
      url: `${ADMIN_PREFIX}/dashboard`,
      icon: LayoutDashboardIcon,
    },
    {
      title: "Food management",
      url: `${ADMIN_PREFIX}/foods`,
      icon:PopcornIcon,
    },
    {
      title: "Order management",
      url: `${ADMIN_PREFIX}/orders`,
      icon:IconUsers,
    },
    {
      title: "Transactions",
      url: `${ADMIN_PREFIX}/transaction`,
      icon:Banknote,
    },
    {
      title: "Settings",
      url: `${ADMIN_PREFIX}/settings`,
      icon: SlidersHorizontalIcon,
    },
  ],
};