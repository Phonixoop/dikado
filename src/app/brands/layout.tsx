import React from "react";
import Breadcrumbs from "~/features/breadcumb";

export default function BrandsPageLayout({ children }) {
  return (
    <div className="items-top flex h-fit w-full justify-center py-10">
      {/* <Breadcrumbs /> */}
      {children}
    </div>
  );
}
