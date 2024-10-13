import React, { Suspense } from "react";

import { Container } from "~/ui/containers";

import { CategoryProvider, useCategory } from "~/context/category.context";

import { getServerAuthSession } from "~/server/auth";

import UsersList from "~/app/admin/users/list";
import CategoryForm from "~/app/admin/categories/form";
import { CategoriesList } from "~/app/admin/categories/list";

export default async function CategoriesPage() {
  return (
    <Container className="flex flex-col-reverse items-stretch gap-10 py-10 2xl:flex-row">
      <CategoryProvider>
        <div className="sticky top-5 h-fit rounded-lg bg-secondary p-5 2xl:w-4/12">
          <CategoryForm />
        </div>

        <div className="h-fit max-h-[42rem] w-full overflow-hidden overflow-y-auto rounded-lg border border-accent/30 bg-secondary 2xl:w-7/12 2xl:p-5">
          <CategoriesList />
        </div>
      </CategoryProvider>
    </Container>
  );
}
