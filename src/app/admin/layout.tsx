import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { LeftSide } from "~/app/admin/left-side";
import SubContaier from "~/app/admin/sub-contaier";
import { ADMIN_MENU_LIST } from "~/constants";
import NextBreadcrumb from "~/features/nextBreadcrumb";
import DecideMobileOrDesktop from "~/features/decide-mobile-desktop";
import Menu from "~/features/menu";
import { getServerAuthSession } from "~/server/auth";
import BlurBackground from "~/ui/blur-backgrounds";
import { Container, ContainerBottomBorder } from "~/ui/containers";
import { getPathName } from "~/utils/util";

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
      <Container className="flex w-full items-center justify-center">
        <BlurBackground />

        <Container className="flex flex-col bg-secondary">
          <div
            className="flex flex-col items-center justify-between gap-5 py-8 md:flex-row"
            dir="rtl"
          >
            <div className="flex flex-col items-center justify-center gap-2 md:flex-row">
              <div className="flex items-center justify-center text-accent">
                <Link href={"/admin"}>
                  <span className="px-2"> {session?.user?.username}</span>
                  <DecideMobileOrDesktop />
                  <span> {session?.user?.name}</span>
                </Link>
                <NextBreadcrumb
                  menu={ADMIN_MENU_LIST}
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
      <ContainerBottomBorder className="sticky top-16 z-50 flex border-t border-primary/30 backdrop-blur-lg">
        <Container className="max2xl:w-full">
          <Menu rootPath={"/admin/"} list={ADMIN_MENU_LIST} />
        </Container>
      </ContainerBottomBorder>
      <SubContaier />
      <ContainerBottomBorder className="h-full items-start bg-accent/10">
        {children}
      </ContainerBottomBorder>
    </div>
  );
}
