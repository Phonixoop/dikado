"use client";
import { usePathname } from "next/navigation";
import React from "react";
import { ADMIN_MENU_LIST } from "~/constants";

import { Container, ContainerBottomBorder } from "~/ui/containers";
import { getPathName } from "~/utils/util";

export default function SubContaier() {
  const pathName = usePathname();

  const currentMenuItem = ADMIN_MENU_LIST.find(
    (a) => a.link == getPathName(pathName),
  );
  return (
    <ContainerBottomBorder>
      <Container className="flex flex-col gap-5 px-5 py-10">
        <h1 className="text-primary">{currentMenuItem?.value}</h1>
        {currentMenuItem?.description && (
          <p className="text-sm text-accent">{currentMenuItem?.description}</p>
        )}
      </Container>
    </ContainerBottomBorder>
  );
}
