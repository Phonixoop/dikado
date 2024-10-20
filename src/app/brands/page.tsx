import React, { Suspense } from "react";
import BrandsWithFilterView from "~/app/brands/brands-with-filter-view";
import { api } from "~/trpc/server";
import { Container } from "~/ui/containers";
import H2 from "~/ui/heading/h2";

export default async function BrandsPage({ params, searchParams }) {
  const filters = getArray(searchParams?.filters);
  const categories = await api.category.getAll();
  const brands = await api.brand.getAll({ categoryNames: filters });

  // const brands = categories
  //   .map((a) => a.brands)
  //   .flat()
  //   .filter((c) => c.id);

  return (
    <>
      <Container
        rtl
        className="mx-auto flex flex-col gap-10 rounded-lg border border-accent bg-accent/10 p-10"
      >
        <H2 className="text-4xl text-accent">برند ها</H2>

        <BrandsWithFilterView categories={categories} brands={brands} />
      </Container>
    </>
  );
}
function getArray(value) {
  // Check if filters is undefined or null
  if (!value) {
    return [];
  }

  // Convert filters to an array if it's a string or return as is if it's already an array
  return Array.isArray(value) ? value : [value];
}
