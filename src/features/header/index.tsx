"use server";

import { MENU, TMenu } from "~/constants";
import Link from "next/link";

import Menu from "~/features/menu";

import DrawerView from "~/features/drawer-view";
import { cn } from "~/lib/utils";
import { AuthShowcase } from "~/features/header/show-case";
import { getServerAuthSession } from "~/server/auth";

import { headers } from "next/headers";
import Image from "next/image";
import DikadoLogo from "~/ui/icons/dikado";

export default async function Header() {
  const session = await getServerAuthSession();
  const headersList = headers();
  const pathMame = headersList.get("x-pathname");
  const link = "/brands";
  return (
    <>
      <header
        dir="rtl"
        className="sticky top-0 z-50 flex w-full flex-col items-center justify-between border-b border-primary/20 bg-secondary/50 py-5 backdrop-blur-lg sm:p-0"
      >
        <div className="flex w-full flex-row items-center justify-between gap-4 py-2 lg:w-11/12">
          <div className="flex w-full flex-row items-center justify-start gap-4 px-2 sm:w-max sm:px-0">
            <div className="flex sm:hidden">
              <DrawerView className="bg-secondary" title="منو">
                <div dir="rtl" className="flex flex-col gap-4 p-4 text-right">
                  {MENU.map((item: TMenu, i) => {
                    return (
                      <>
                        <Link
                          key={i}
                          className={cn(
                            "rounded-lg bg-secbuttn p-2 text-primary",
                            item.link === pathMame
                              ? "bg-accent/20 text-accent"
                              : "",
                          )}
                          href={item.link}
                        >
                          {item.link}
                        </Link>
                        <SubMenu item={item} pathname={pathMame} />
                      </>
                    );
                  })}
                </div>
              </DrawerView>
            </div>
            <div className="flex items-center justify-center gap-4">
              {/* <Image src="/logo.png" width={45} height={45} alt="logo" /> */}
              <DikadoLogo className="h-auto w-12" />
            </div>
            <Menu
              className="hidden sm:flex"
              rootPath="/"
              pathName={pathMame}
              list={MENU}
            />
          </div>

          <div className="flex items-center justify-center gap-5">
            <AuthShowcase session={session} />
          </div>
        </div>
      </header>
    </>
  );
}

function SubMenu({ item, pathname }: { item: TMenu; pathname: string }) {
  return item?.subMenu
    ? item?.subMenu.map((subItem, j) => {
        return (
          <div key={j} dir="rtl" className="flex flex-col pr-4">
            <Link
              className={cn(
                "w-fit self-start rounded-lg bg-secbuttn p-2 text-primary",
                subItem.link === pathname ? "bg-accent/20 text-accent" : "",
              )}
              href={subItem.link}
            >
              {subItem.value}
            </Link>
          </div>
        );
      })
    : "";
}
