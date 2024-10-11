"use client";

import { signOut } from "next-auth/react";
import Button from "~/ui/buttons";
import ExitIcon from "~/ui/icons/exits";
import NotificationIcon from "~/ui/icons/notification";

export function LeftSide() {
  return (
    <>
      <div className="flex items-center justify-center gap-5 ">
        <Button className="cursor-pointer rounded-full stroke-accent p-1.5  ring-1 ring-accent hover:bg-accent/50 hover:stroke-primary hover:ring-accent/50">
          <NotificationIcon className="h-4 w-4  " />
        </Button>
        <Button
          onClick={() => signOut()}
          className="flex cursor-pointer items-center justify-center gap-2 rounded-full stroke-white p-1.5 text-primary  hover:bg-accent/50 hover:stroke-primary hover:ring-accent/50"
        >
          <ExitIcon className="h-4 w-4" />
          <span className="hidden text-sm text-primary md:flex">خروج</span>
        </Button>
      </div>
    </>
  );
}
