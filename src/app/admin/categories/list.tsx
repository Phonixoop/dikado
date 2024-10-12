"use client";
import { Category } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import path from "path";
import { useMemo } from "react";
import { useCategory } from "~/context/category.context";
import DynamicList from "~/features/dynamic-list";
import { api } from "~/trpc/react";
import Button from "~/ui/buttons";
import withConfirmation from "~/ui/with-confirmation";
const ButtonWithConfirmation = withConfirmation(Button);

export function CategoriesList() {
  const { selectedRowCategory, setSelectedRowCategory } = useCategory();
  const utils = api.useUtils();
  const categories = api.category.getCategories.useInfiniteQuery(
    { limit: 8 },
    { getNextPageParam: (lastPage) => lastPage.nextCursor },
  );

  const deleteCategory = api.category.deleteCategory.useMutation({
    onSuccess: async () => {
      await utils.category.getCategories.invalidate();
    },
  });

  const columns = useMemo<ColumnDef<Category>[]>(
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
        header: "icon_url",
        accessorKey: "icon_url",
        cell: ({ row }) => {
          const sanitizedIconUrl = row.original.icon_url.startsWith("./")
            ? row.original.icon_url.substring(1)
            : row.original.icon_url;

          const url = path.join(
            process.env.NEXT_PUBLIC_BASE_URL,
            "api",

            sanitizedIconUrl,
          );

          return (
            <>
              <Image
                src={url}
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
            onConfirm={() => deleteCategory.mutate({ id: row.original.id })}
            title="حذف دسته بندی"
          >
            Delete
          </ButtonWithConfirmation>
        ),
      },
    ],
    [deleteCategory],
  );

  return (
    <DynamicList<any>
      selectedRowId={selectedRowCategory?.id}
      data={categories.data?.pages.flatMap((page) => page.items) || []}
      columns={columns}
      isLoading={categories.isLoading}
      hasNextPage={categories.hasNextPage}
      fetchNextPage={categories.fetchNextPage}
      onRead={(category) => setSelectedRowCategory(category)}
      onDelete={(category) => console.log("Delete category", category)}
    />
  );
}
