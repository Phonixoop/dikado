"use client";

import * as React from "react";
import Link from "next/link";
import { useMediaQuery } from "~/hooks/use-media-query";
import { usePathname } from "next/navigation";

import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "~/components/shadcn/breadcrumb";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/shadcn/drop-down-menu";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "~/components/shadcn/drawer";
import Button from "~/ui/buttons";
import { MENU, TMenu } from "~/constants";

const ITEMS_TO_DISPLAY = 3;

// Sample MENU array

// Helper function to find translation
function findMenuItem(menu: TMenu[], pathname: string): string | undefined {
  for (let item of menu) {
    if (item.link === pathname) {
      return item.value;
    }
    if (item.subMenu) {
      const subItem = findMenuItem(item.subMenu, pathname);
      if (subItem) {
        return subItem;
      }
    }
  }
  return undefined;
}

export function BreadcrumbResponsive() {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const pathname = usePathname();

  // Split pathname into individual segments
  const segments = pathname
    .split("/")
    .filter((segment) => segment)
    .map((segment) => decodeURIComponent(segment));

  return (
    <Breadcrumb className="px-5">
      <BreadcrumbList>
        {/* Render Home separately */}
        <BreadcrumbItem>
          <BreadcrumbLink href="/">
            {findMenuItem(MENU, "/") || "Home"}
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />

        {segments.length > ITEMS_TO_DISPLAY ? (
          <>
            <BreadcrumbItem>
              {isDesktop ? (
                <DropdownMenu open={open} onOpenChange={setOpen}>
                  <DropdownMenuTrigger
                    className="flex items-center gap-1"
                    aria-label="Toggle menu"
                  >
                    <BreadcrumbEllipsis className="h-4 w-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-secondary" align="center">
                    {segments.slice(1, -2).map((segment, index) => (
                      <DropdownMenuItem key={index}>
                        <Link href={`/${segment}`}>
                          {findMenuItem(MENU, `/${segment}`) || segment}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Drawer open={open} onOpenChange={setOpen}>
                  <DrawerTrigger aria-label="Toggle Menu">
                    <BreadcrumbEllipsis className="h-4 w-4" />
                  </DrawerTrigger>
                  <DrawerContent>
                    <DrawerHeader className="text-left">
                      <DrawerTitle>Navigate to</DrawerTitle>
                      <DrawerDescription>
                        Select a page to navigate to.
                      </DrawerDescription>
                    </DrawerHeader>
                    <div className="grid gap-1 px-4">
                      {segments.slice(1, -2).map((segment, index) => (
                        <Link
                          key={index}
                          href={`/${segment}`}
                          className="py-1 text-sm"
                        >
                          {findMenuItem(MENU, `/${segment}`) || segment}
                        </Link>
                      ))}
                    </div>
                    <DrawerFooter className="pt-4">
                      <DrawerClose asChild>
                        <Button>Close</Button>
                      </DrawerClose>
                    </DrawerFooter>
                  </DrawerContent>
                </Drawer>
              )}
            </BreadcrumbItem>
            <BreadcrumbSeparator />
          </>
        ) : null}

        {segments.slice(-ITEMS_TO_DISPLAY + 1).map((segment, index) => (
          <BreadcrumbItem key={index}>
            {index < segments.length - 1 ? (
              <>
                <BreadcrumbLink
                  asChild
                  className="max-w-20 truncate md:max-w-none"
                >
                  <Link href={`/${segment}`}>
                    {findMenuItem(MENU, `/${segment}`) || segment}
                  </Link>
                </BreadcrumbLink>
                <BreadcrumbSeparator />
              </>
            ) : (
              <BreadcrumbPage className="max-w-20 truncate md:max-w-none">
                {findMenuItem(MENU, `/${segment}`) || segment}
              </BreadcrumbPage>
            )}
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
