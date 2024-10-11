"use client";
import React from "react";
import Table from "~/features/table";

export default function DataClient({ cols, data }) {
  const colObjs = cols.map((c) => {
    return {
      header: c,
      accessorKey: c,
      cell: ({ row }) => {
        return (
          <div className="w-full cursor-pointer rounded-full  px-2 py-2 text-primary  ">
            hi
          </div>
        );
      },
    };
  });
  const columns = colObjs || [];
  return (
    <>
      <Table columns={data.length > 0 ? columns : []} data={data} />
    </>
  );
}
