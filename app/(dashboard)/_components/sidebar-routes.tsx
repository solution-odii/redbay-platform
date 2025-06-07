
"use client";

import { SidebarItem } from "./sidebar-item"; // Fixed typo in import
import Dashboard from "@/components/svg Icons/Dashboard";
import Transactions from "@/components/svg Icons/Transactions";
import Vnu from "@/components/svg Icons/Vnu";
import Merchant from "@/components/svg Icons/Merchant";
import Settlements from "@/components/svg Icons/Settlements";
import Payouts from "@/components/svg Icons/Payouts";
import Api from "@/components/svg Icons/Api";
import Users from "@/components/svg Icons/Users";
import Audit from "@/components/svg Icons/Audit";
import Settings from "@/components/svg Icons/Settings";
import Logout from "@/components/svg Icons/Logout";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";

const adminRoutes = [
  {
    icon: Dashboard,
    label: "Dashboard",
    href: "/dashboard",
  },
  {
    icon: Transactions,
    label: "Transactions",
    href: "/transactions",
  },
  {
    icon: Vnu,
    label: "vNUBANs",
    href: "/vnubans",
  },
  {
    icon: Merchant,
    label: "Merchant",
    href: "/merchant",
  },
  {
    icon: Settlements,
    label: "Settlements",
    href: "/settlements",
  },
  {
    icon: Payouts,
    label: "Payouts",
    href: "/payouts",
  },
  {
    icon: Api,
    label: "API Docs",
    href: "/docs",
  },
  {
    icon: Users,
    label: "Users",
    href: "/users",
  },
  {
    icon: Audit,
    label: "Audit Trails",
    href: "/audit",
  }, 
];

const actionRoutes = [
  {
    icon: Settings, // Placeholder for Settings icon
    label: "Settings",
    href: "/settings",
  },
  {
    icon: Logout, // Placeholder for Logout icon
    label: "Logout",
    href: "/",
  },
]
export const SidebarRoutes = () => {

  const routes = adminRoutes;
  const act = actionRoutes;

  return (
    <div className="flex flex-col w-full">
  
      {routes.map((route) => (
        <SidebarItem
          key={route.href}
          icon={route.icon}
          label={route.label}
          href={route.href}
        />
      ))}
      
<div className="mt-[150px] w-full">
{act.map((route) => (
        <SidebarItem
          key={route.href}
          icon={route.icon}
          label={route.label}
          href={route.href}
        />
      ))}
      <div className="flex items-center space-x-3 ml-6 mt-3 border-t-gray-700">
          <Avatar>
            <AvatarImage src="/placeholder-avatar.jpg" alt="Odi Marshal C." /> {/* Replace with actual user image */}
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">John Doe .A.</p>
            <p className="text-xs text-[#C80000] dark:text-gray-400">Super Admin</p>
          </div>
        </div>
      </div>
    </div>
  );
};