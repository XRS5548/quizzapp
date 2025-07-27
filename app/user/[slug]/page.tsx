"use client";

import React, { useEffect, useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconPlusEqual,
  IconPuzzle,
  IconSatellite,
  IconUserBolt,
} from "@tabler/icons-react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import Logout from "@/components/admin/logout";
import { MyQuizzesTable } from "@/components/admin/MyQuizzs";
import CreateQuizForm from "@/components/admin/CreateQuizz";
import Image from "next/image";
import DashboardUser from "@/components/admin/Dashboard";
import PortfoliyoUser from "@/components/admin/Portfoliyo";
import ProfileUser from "@/components/admin/ProfileUser";

// Moved Logo & LogoIcon here since page files should not export named components
const Logo = () => {
  return (
    <a
      href="#"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
    >
      <div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-black dark:bg-white" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium whitespace-pre text-black dark:text-white"
      >
        Hi Quizz Dashboard
      </motion.span>
    </a>
  );
};

const LogoIcon = () => {
  return (
    <a
      href="#"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
    >
      <div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-black dark:bg-white" />
    </a>
  );
};

export default function SidebarDemo() {
  const links = [
    {
      label: "Dashboard",
      href: "/user/dashboard",
      icon: <IconBrandTabler className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />,
    },
    {
      label: "Profile",
      href: "/user/profile",
      icon: <IconUserBolt className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />,
    },
    {
      label: "Create Quizz",
      href: "/user/createquizz",
      icon: <IconPlusEqual className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />,
    },
    {
      label: "MyQuizzs",
      href: "/user/myquizz",
      icon: <IconPuzzle className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />,
    },
    {
      label: "Portfoliyo",
      href: "/user/portfoliyo",
      icon: <IconSatellite className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />,
    },
    {
      label: "Logout",
      href: "/user/logout",
      icon: <IconArrowLeft className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />,
    },
  ];

  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [useinfo, setUserinfo] = useState(null)

  useEffect(function () {
    async function fetchuserinfo() {
      let userinfo = await fetch("/api/userinfo")
      let info = await userinfo.json()
      setUserinfo(info)
    }
    fetchuserinfo()
  }, [])


  return (
    <div
      className={cn(
        "mx-auto flex flex-1 flex-col overflow-hidden rounded-md border border-neutral-200 bg-gray-100 md:flex-row dark:border-neutral-700 dark:bg-neutral-800",
        "h-screen"
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink
                  className={
                    pathname.startsWith(link.href)
                      ? "border-b hover:bg-blue-600 p-2"
                      : "p-2 hover:bg-slate-700"
                  }
                  key={idx}
                  link={link}
                />
              ))}
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: useinfo?`${useinfo.fname} ${useinfo.lname}`:"User",
            href: "/user/profile",
            icon: (
            <Image
              src={useinfo?useinfo.image:"https://assets.aceternity.com/manu.png"}
              className="h-7 w-7 shrink-0 rounded-full"
              width={28}
              height={28}
              alt="Avatar"
            />
            ),
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>
      <Dashboard />
    </div>
  );
}

const paths = [
  {
    path: "/user/dashboard",
    Component: <DashboardUser />,
  },
  {
    path: "/user/profile",
    Component: <ProfileUser />,
  },
  {
    path: "/user/createquizz",
    Component: <CreateQuizForm />,
  },
  {
    path: "/user/myquizz",
    Component: <MyQuizzesTable />,
  },
  {
    path: "/user/portfoliyo",
    Component: <PortfoliyoUser />,
  },
  {
    path: "/user/logout",
    Component: <Logout />,
  },
];

const Dashboard = () => {
  const pathname = usePathname();
  return (
    <div className="border-white border w-full p-4 max-h-screen overflow-scroll">
      {paths.map((path, i) => {
        if (pathname.startsWith(path.path)) {
          return <React.Fragment key={i}>{path.Component}</React.Fragment>;
        }
        return null;
      })}
    </div>
  );
};
