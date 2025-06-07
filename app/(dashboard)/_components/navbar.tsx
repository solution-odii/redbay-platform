"use client";

import { NavbarRoutes } from "@/components/navbar-routes";
import { MobileSidebar } from "./Mobile-sidebar";


export const Navbar = () => {
  return (
    <div className="p-4 border-b h-full flex items-center shadow-sm bg-card">
      <MobileSidebar />
      <NavbarRoutes
      />
    </div>
  );
};