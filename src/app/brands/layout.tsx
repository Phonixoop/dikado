import React from "react";
import { BreadcrumbResponsive } from "~/features/breadcumb";
import { Container } from "~/ui/containers";

export default function BrandsPageLayout({ children }) {
  return (
    <Container
      rtl
      className="mx-auto flex h-fit w-full flex-col items-start justify-center gap-10 py-10"
    >
      {/* <Breadcrumbs /> */}

      <BreadcrumbResponsive />

      {children}
    </Container>
  );
}
