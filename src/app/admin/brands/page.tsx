import React, { Suspense } from "react";

import { Container } from "~/ui/containers";

import { CategoryProvider, useCategory } from "~/context/category.context";

import { getServerAuthSession } from "~/server/auth";

import CategoryForm from "~/app/admin/brands/form";
import { BrandsList } from "~/app/admin/brands/list";
import { BrandProvider } from "~/context/brand.context";

export default async function BrandsPage() {
  return (
    <Container className="flex flex-col-reverse items-stretch gap-10 py-10 2xl:flex-row">
      <BrandProvider>
        <div className="sticky top-5 h-fit rounded-lg bg-secondary p-5 2xl:w-4/12">
          <CategoryForm />
        </div>

        <div className="h-fit max-h-[42rem] w-full overflow-hidden overflow-y-auto rounded-lg border border-accent/30 bg-secondary 2xl:w-7/12 2xl:p-5">
          <BrandsList />
        </div>
      </BrandProvider>
    </Container>
  );
}
