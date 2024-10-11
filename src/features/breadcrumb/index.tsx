"use client";

import React, { ReactNode } from "react";

import { usePathname } from "next/navigation";
import Link from "next/link";

function getPathPersianName(
  menuList: {
    value: string;
    link: string;
    description: string;
  }[],
  pathname: string,
) {
  return menuList?.find((a) => a.link == pathname);
}

type TBreadCrumbProps = {
  menu: {
    value: string;
    link: string;
    description: string;
  }[];
  homeElement: ReactNode;
  separator: ReactNode;
  containerClasses?: string;
  listClasses?: string;
  activeClasses?: string;
  capitalizeLinks?: boolean;
};

const NextBreadcrumb = ({
  menu,
  homeElement,
  separator,
  containerClasses,
  listClasses,
  activeClasses,
  capitalizeLinks,
}: TBreadCrumbProps) => {
  const paths = usePathname();
  const pathNames = paths.split("/").filter((path) => path);
  const isMenuActive = menu.map((a) => pathNames.includes(a.link));
  return (
    <div>
      <ul className={containerClasses}>
        {pathNames.length > 1 && separator}
        {pathNames.map((link, index) => {
          if (link === "admin") return;
          let href = `/${pathNames.slice(0, index + 1).join("/")}`;
          let itemClasses =
            paths === href ? `${listClasses} ${activeClasses}` : listClasses;
          let itemLink = capitalizeLinks
            ? link[0].toUpperCase() + link.slice(1, link.length)
            : link;
          return (
            <React.Fragment key={index}>
              <li className={itemClasses}>
                <Link href={href}>
                  {getPathPersianName(menu, link)?.value ?? link}
                </Link>
              </li>
              {pathNames.length > 1 &&
                index < pathNames.length - 1 &&
                separator}
            </React.Fragment>
          );
        })}
      </ul>
    </div>
  );
};

export default NextBreadcrumb;
