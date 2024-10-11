"use client";

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

import { Permission, User } from "~/types";
import { redirect } from "next/navigation";
import { useRouter } from "next/router";
import { twMerge } from "tailwind-merge";
import DrawerView from "~/features/drawer-view";
import { cn } from "~/lib/utils";
import { Session } from "next-auth";

export function AuthShowcase({ session }: { session: Session }) {
  const user: User = session?.user;

  //   if (status === "loading")
  //     return <div className="h-5 w-20 animate-pulse"></div>;

  if (!session)
    return (
      <div className="flex w-full items-center justify-between gap-5 px-4">
        <Button
          className="flex  items-center justify-center gap-2 rounded-lg border border-accent bg-primary stroke-accent p-0 px-2 py-1  text-secondary"
          onClick={session ? () => void signOut() : () => void signIn()}
        >
          <span>ورود</span>

          <FormInputIcon className="stroke-secondary" />
        </Button>
        <ThemeProvider>
          <ThemeSwitch />
        </ThemeProvider>
      </div>
    );

  const permissions: Permission[] = user?.role
    ? JSON.parse(user?.role?.permissions)
    : [];

  const permission = permissions.find((p) => p.id === "ViewAdmin");
  const isAdmin = permission && permission?.isActive === true;

  return (
    <div className="flex  flex-row gap-4 rounded-full ">
      <div className="flex items-center gap-5  px-2 ">
        <ThemeProvider>
          <ThemeSwitch />
        </ThemeProvider>
      </div>
      <div className="relative flex  items-center justify-center gap-2 rounded-full  ">
        <Button
          className="flex  items-center justify-center gap-2 rounded-xl border border-primary/20  stroke-accent p-2 text-primary sm:px-4 sm:py-1"
          onClick={session ? () => void signOut() : () => void signIn()}
        >
          <span className="hidden sm:flex">{session ? "خروج" : "ورود"}</span>
          <LogOutIcon className="h-4 w-4" />
        </Button>{" "}
        <span className="hidden items-stretch justify-center gap-2 rounded-full stroke-accent px-3 text-accent sm:flex">
          <span className="">
            {user?.display_name ? user?.display_name : user?.username}
          </span>
        </span>
        {isAdmin && (
          <>
            <div className="hidden h-[15px] w-[0.5px] bg-accent sm:flex"></div>
            <Link href={"/admin"}>
              <Button className="flex min-w-max items-stretch justify-center gap-2 rounded-xl bg-secondary  stroke-accent  text-accent">
                <div className="flex w-fit items-center justify-center gap-2">
                  <span>پنل ادمین</span>
                  <UserCog2Icon />
                </div>
              </Button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

function ThemeSwitch() {
  const canUseDOM: boolean = !!(
    typeof window !== "undefined" &&
    typeof window.document !== "undefined" &&
    typeof window.document.createElement !== "undefined"
  );
  const [value, setValue] = useState(true);

  const { theme, setTheme } = useTheme();

  return (
    <>
      <Switch
        dir="ltr"
        className="scale-125"
        middle={
          (!theme?.includes("dark") && !theme?.includes("light")) || theme == ""
        }
        checked={theme?.includes("dark") ? true : false}
        IconLeft={SunDimIcon}
        IconRight={MoonIcon}
        onClick={() => {
          if (value === false) {
            document.querySelector("body").className = "theme-dark-1";
            setTheme("theme-dark-1");
            localStorage.setItem("theme", "theme-dark-1");
          } else {
            document.querySelector("body").className = "theme-light-4";

            setTheme("theme-light-4");
            localStorage.setItem("theme", "theme-light-4");
          }
          setValue(!value);
        }}
      />
    </>
  );
}
