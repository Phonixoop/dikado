import { LayoutGroup } from "framer-motion";
import { signOut } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { LeftSide } from "~/app/admin/left-side";
import NextBreadcrumb from "~/features/breadcrumb";
import DecideMobileOrDesktop from "~/features/decide-mobile-desktop";
import Menu from "~/features/menu";
import ThemeBox from "~/features/theme-box";
import { getServerAuthSession } from "~/server/auth";
import BlurBackground from "~/ui/blur-backgrounds";
import Button from "~/ui/buttons";
import { Container, ContainerBottomBorder } from "~/ui/containers";
import ExitIcon from "~/ui/icons/exits";
import NotificationIcon from "~/ui/icons/notification";

const menuList = [
  {
    value: "کاربر ها",
    link: "users",
    description: `در این بخش می توانید کاربر های مد نظر خود را بسازید، ویرایش کنید و
    یا حذف کنید و تنظیمات مربوط به آن ها را تغییر دهید`,
  },

  {
    value: "سمت ها",
    description: `در این بخش می توانید سمت های مد نظر خود را بسازید تا در بخش کاربر ها برای آن ها اعمال کنید`,
    link: "roles",
  },

  {
    value: "فرم ها",
    description: `در این بخش می توانید بر روی فرم ویرایش های لازم را انجام دهید`,
    link: "forms",
  },
];
export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerAuthSession();

  return (
    <div
      dir="rtl"
      className="m-auto flex min-h-screen w-full max-w-[1920px] flex-col items-center bg-secondary"
    >
      <Container className="flex w-full items-center justify-center ">
        <BlurBackground />

        <Container className="flex  flex-col bg-secondary">
          <div
            className="flex flex-col items-center justify-between gap-5  py-8 md:flex-row"
            dir="rtl"
          >
            <div className="flex flex-col  items-center justify-center gap-2 md:flex-row">
              <div className="flex items-center justify-center text-accent">
                <Link href={"/admin"}>
                  <span className="px-2 "> {session?.user?.username}</span>
                  <DecideMobileOrDesktop />
                  <span> {session?.user?.name}</span>
                </Link>
                <NextBreadcrumb
                  menu={menuList}
                  homeElement={""}
                  separator={<span> / </span>}
                  activeClasses="text-amber-500"
                  containerClasses="flex "
                  listClasses="hover:underline mx-2 font-bold"
                  capitalizeLinks
                />
              </div>
              {/* <ThemeBox /> */}
            </div>

            <LeftSide />
          </div>
        </Container>
      </Container>
      <ContainerBottomBorder className=" sticky top-0 z-50 flex pt-2 backdrop-blur-lg">
        <Container className=" max2xl:w-full">
          <Menu rootPath={"/admin"} list={menuList} />
        </Container>
      </ContainerBottomBorder>
      {/* {currentMenuItem && (
        <LayoutSubContainer currentMenuItem={currentMenuItem} />
      )} */}
      <ContainerBottomBorder className="h-full items-start bg-accent/5 ">
        {children}
      </ContainerBottomBorder>
    </div>
  );
}
