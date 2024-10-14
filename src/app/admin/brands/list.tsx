"use client";
import { Brand } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import path from "path";
import { useMemo } from "react";
import { useBrand } from "~/context/brand.context";
import DynamicList from "~/features/dynamic-list";
import { api } from "~/trpc/react";

import Button from "~/ui/buttons";
import withConfirmation from "~/ui/with-confirmation";
const ButtonWithConfirmation = withConfirmation(Button);

export function BrandsList() {
  const { selectedRowBrand, setSelectedRowBrand } = useBrand();
  const utils = api.useUtils();
  const brands = api.brand.getBrands.useInfiniteQuery(
    { limit: 8 },
    { getNextPageParam: (lastPage) => lastPage.nextCursor },
  );

  const deleteBrand = api.brand.deleteBrand.useMutation({
    onSuccess: async () => {
      await utils.brand.getBrands.invalidate();
    },
  });

  const columns = useMemo<ColumnDef<Brand>[]>(
    () => [
      {
        header: "#",
        accessorKey: "number",
        cell: ({ row }) => <span>{row.index + 1}</span>,
      },
      {
        header: "name",
        accessorKey: "name",
        cell: ({ row }) => <span>{row.original.name}</span>,
      },
      {
        header: "image_url",
        accessorKey: "image_url",
        cell: ({ row }) => {
          const sanitizedIconUrl = row.original.image_url.startsWith("./")
            ? row.original.image_url.substring(1)
            : row.original.image_url;

          return (
            <>
              <Image
                src={sanitizedIconUrl}
                height={100}
                width={100}
                alt={row.original.name}
                objectFit="cover"
              />
            </>
          );
        },
      },
      {
        header: "Actions",
        accessorKey: "actions",
        cell: ({ row }) => (
          <ButtonWithConfirmation
            className="bg-amber-200 text-amber-700"
            onConfirm={() => deleteBrand.mutate({ id: row.original.id })}
            title="حذف دسته بندی"
          >
            حذف
          </ButtonWithConfirmation>
        ),
      },
    ],
    [deleteBrand],
  );

  return (
    <DynamicList<any>
      selectedRowId={selectedRowBrand?.id}
      data={brands.data?.pages.flatMap((page) => page.items) || []}
      columns={columns}
      isLoading={brands.isLoading}
      hasNextPage={brands.hasNextPage}
      fetchNextPage={brands.fetchNextPage}
      onRead={(brand) => setSelectedRowBrand(brand)}
      onDelete={(brand) => console.log("Delete brand", brand)}
    />
  );
}
