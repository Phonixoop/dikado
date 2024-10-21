"use client";

import { Brand, Category } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { Suspense } from "react";
import { cn } from "~/lib/utils";
import { api } from "~/trpc/react";
import { api as apiServer } from "~/trpc/server";
import Checkbox from "~/ui/forms/checkbox";

type CategoryWithBrandType = Awaited<
  ReturnType<typeof apiServer.category.getAll>
>;

export default function BrandsWithFilterView({ categories, brands }) {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());
  const selectedFilters = params.getAll("filters") ?? [];

  // const categories = api.category.getAll.useQuery();

  const getBrands = api.brand.getAll.useQuery(
    {
      categoryNames: selectedFilters,
    },
    {
      initialData: brands,
      refetchOnReconnect: false,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    },
  );

  const handleCheckboxChange = (value: string, checked: boolean) => {
    const newFilters = new Set(selectedFilters);

    if (checked) {
      newFilters.add(value); // Add the filter if checked
    } else {
      newFilters.delete(value); // Remove the filter if unchecked
    }

    // Update URL parameters
    const newParams = new URLSearchParams();
    newFilters.forEach((filter: string) => newParams.append("filters", filter));
    window.history.replaceState(
      {},
      "",
      `${window.location.pathname}?${newParams}`,
    );
  };

  return (
    <div className="flex w-full flex-row justify-start gap-5">
      <div className="flex w-[25%] flex-col items-center justify-center gap-4 rounded-xl bg-secondary py-5">
        <h3 className="text-2xl">دسته بندی</h3>
        <div className="flex w-full flex-col items-center justify-center divide-y divide-accent rounded-xl bg-secondary">
          {categories.map((category) => {
            const isChecked = selectedFilters.includes(category.name);
            return (
              <div
                key={category.id}
                className={cn("flex w-full items-center justify-center")}
              >
                <Checkbox
                  className={cn(
                    "min-w-40 rounded-sm p-2",
                    isChecked ? "bg-accent/10" : "",
                  )}
                  id={category.id}
                  checked={isChecked}
                  label={category.name}
                  onChange={(checked) =>
                    handleCheckboxChange(category.name, checked)
                  }
                />
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex w-full flex-wrap items-stretch gap-3">
        {getBrands?.data?.map((brand) => {
          const sanitizedImageUrl = brand.image_url.startsWith("./")
            ? brand.image_url.substring(1)
            : brand.image_url;
          return (
            <Link
              className="flex flex-col items-center justify-center gap-5 rounded-xl bg-accent/10 p-5"
              href={`/brands/${brand.name}`}
              key={brand.name}
            >
              <Image
                src={sanitizedImageUrl}
                height={100}
                width={100}
                alt={brand.name}
                objectFit="cover"
              />
              <h3>{brand.name}</h3>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
