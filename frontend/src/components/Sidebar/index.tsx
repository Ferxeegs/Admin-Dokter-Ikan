"use client";

import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import SidebarItem from "@/components/Sidebar/SidebarItem";
import ClickOutside from "@/components/ClickOutside";
import useLocalStorage from "@/hooks/useLocalStorage";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const menuGroups = [
  {
    menuItems: [
      {
        icon: (
          <img
            className="fill-current"
            src="/images/icon/dashboard.svg"
            alt="Dashboard Icon"
            width={30}
          />
        ),
        label: "Dashboard",
        route: "/",
      },
      {
        icon: (
          <img
            className="fill-current"
            src="/images/icon/akun.svg"
            alt="Akun Icon"
            width={30}
          />
        ),
        label: "Akun",
        route: "/akun",
      },
      {
        icon: (
          <img
            className="fill-current"
            src="/images/icon/activity.svg"
            alt="Activity Icon"
            width={30}
          />
        ),
        label: "Activity",
        route: "/activity",
      },
      {
        icon: (
          <img
            className="fill-current"
            src="/images/icon/transaksi.svg"
            alt="Transaksi Icon"
            width={30}
          />
        ),
        label: "Transaksi",
        route: "/transaksi",
      },
      {
        icon: (
          <img
            className="fill-current"
            src="/images/icon/settings.svg"
            alt="Settings Icon"
            width={30}
          />
        ),
        label: "Settings",
        route: "/settings",
      },
    ],
  },
];


const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const pathname = usePathname();
  const [pageName, setPageName] = useLocalStorage("selectedMenu", "dashboard");

  return (
    <ClickOutside onClick={() => setSidebarOpen(false)}>
      <aside
        className={`fixed left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-white duration-300 ease-linear dark:bg-boxdark lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* <!-- SIDEBAR HEADER --> */}
        <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
          <Link href="/" className="flex items-center gap-2">
            <Image
              width={80}
              height={12}
              src={"/images/brand/dokter-ikan.svg"}
              alt="Logo"
              priority
            />
            <span className="text-xl font-extrabold text-blue-400">dokterikan</span>
          </Link>

          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebar"
            className="block lg:hidden"
          >
          </button>
        </div>
        {/* <!-- SIDEBAR HEADER --> */}

        <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
          
          {/* <!-- Sidebar Menu --> */}
          <nav className="mt-1 px-4 py-4 lg:mt-1 lg:px-6">
            {menuGroups.map((group, groupIndex) => (
              <div key={groupIndex}>
                <ul className="mb-6 flex flex-col gap-1.5">
                  {group.menuItems.map((menuItem, menuIndex) => (
                    <SidebarItem
                      key={menuIndex}
                      item={menuItem}
                      pageName={pageName}
                      setPageName={setPageName}
                    />
                  ))}
                </ul>
              </div>
            ))}
          </nav>
          {/* <!-- Sidebar Menu --> */}

        </div>
      </aside>
    </ClickOutside>
  );
};

export default Sidebar;
