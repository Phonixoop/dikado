"use client";
import { ColumnDef } from "@tanstack/react-table";
import React, { useMemo } from "react";
import Table from "~/features/table";
import Button from "~/ui/buttons";
import withConfirmation from "~/ui/with-confirmation";

interface ListProps<T> {
  data: T[];
  selectedRowId: string;
  columns: ColumnDef<T>[];
  onCreate?: () => void;
  onRead?: (item: T) => void;
  onUpdate?: (item: T) => void;
  onDelete?: (item: T) => void;
  isLoading?: boolean;
  hasNextPage?: boolean;
  fetchNextPage?: () => void;
}

export default function DynamicList<T>({
  data,
  selectedRowId,
  columns,
  onCreate,
  onRead,
  onUpdate,
  onDelete,
  isLoading,
  hasNextPage,
  fetchNextPage,
}: ListProps<T>) {
  const handleRowClick = (row: T) => {
    if (onRead) onRead(row);
  };

  const flatData = useMemo(() => data || [], [data]);

  return (
    <>
      <span className="text-primary">{flatData.length}</span>

      <Table
        columns={flatData.length > 0 ? columns : []}
        data={flatData}
        clickedRowIndex={selectedRowId}
        onClick={(row) => onRead(row.original)}
      />

      <div className="flex items-center justify-center gap-5 py-5">
        <Button
          disabled={isLoading || !hasNextPage}
          isLoading={isLoading}
          onClick={fetchNextPage}
          className="w-fit cursor-pointer rounded-full bg-secbuttn px-4 py-2 text-primbuttn"
        >
          {hasNextPage ? "Load More" : "All Loaded"}
        </Button>
      </div>
    </>
  );
}
