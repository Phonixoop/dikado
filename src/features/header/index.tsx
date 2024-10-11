"use server";

import {
  FormInputIcon,
  LogOutIcon,
  MoonIcon,
  SunDimIcon,
  UserCog2Icon,
} from "lucide-react";
import { getSession, signIn, signOut, useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { Switch } from "~/components/ui/switch";
import { MENU } from "~/constants";
import Link from "next/link";
import { ThemeProvider, useTheme } from "~/context/theme.context";
import Menu from "~/features/menu";
import { ThemeBoxHovery } from "~/features/theme-box";
import useLocalStorage from "~/hooks/useLocalStorage";
import Button from "~/ui/buttons";
import { Container } from "~/ui/containers";
import { api } from "~/trpc/react";
import { Permission, User } from "~/types";
import { redirect } from "next/navigation";
import { useRouter } from "next/router";
import { twMerge } from "tailwind-merge";
import DrawerView from "~/features/drawer-view";
import { cn } from "~/lib/utils";
import { AuthShowcase } from "~/features/header/show-case";
import { getServerAuthSession } from "~/server/auth";

function checkStatusForMenu(status, user) {
  if (status === "unauthenticated" || !user)
    return MENU.filter((menu) => {
      switch (menu.value) {
        case "جزئیات عملکرد شعب":
          return false;
        case "جزئیات عملکرد پرسنل شعب (جدول)":
          return false;
        case "جزئیات عملکرد پرسنل شعب":
          return false;
        case "گیج عملکرد استان ها":
          return false;
        case "پرسنل":
          return false;
        case "جزئیات ورودی اسناد مستقیم شعب":
          return false;
      }
      return true;
    });

  return MENU;
}

function LogoRamp({ className = "" }) {
  return (
    <>
      <svg
        width="108"
        height="108"
        viewBox="0 0 108 108"
        fill="none"
        className={twMerge("h-auto w-7 fill-primary", className)}
      >
        <path d="M95.5 1H2L14 15H95V93L107.5 105.5V13C107.5 6.37258 102.127 1 95.5 1Z" />
        <path d="M16 20L30 33.5H15.5V93.5H74V77L88 90.5V95C88 101.627 82.6274 107 76 107H18C9.16344 107 2 99.8366 2 91V34C2 26.268 8.26801 20 16 20Z" />
      </svg>
    </>
  );
}
export default async function Header() {
  const session = await getServerAuthSession();

  return (
    <>
      <header
        dir="rtl"
        className="sticky top-0 z-50 flex w-full flex-col items-center justify-between border-b border-primary/20 bg-secondary/50 py-5 backdrop-blur-lg sm:p-0 "
      >
        <div className="flex w-full  flex-row items-center justify-between gap-4 py-2 lg:w-11/12 ">
          <div className="flex  items-center justify-center gap-5">
            <AuthShowcase session={session} />
          </div>
        </div>
      </header>
    </>
  );
}
