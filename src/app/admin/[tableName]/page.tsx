"use server";
import { PrismaClient } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import moment from "jalali-moment";
import { useRouter } from "next/router";
import { useMemo } from "react";
import DataClient from "~/app/admin/[tableName]/data-client";
import Table from "~/features/table";

const prisma = new PrismaClient();

async function getTableData(tableName) {
  const columns: any[] = await prisma.$queryRawUnsafe(
    `SELECT column_name FROM information_schema.columns WHERE table_name = '${tableName}'`,
  );
  const data: any[] = await prisma.$queryRawUnsafe(
    `SELECT * FROM ${tableName}`,
  );

  return { cols: columns.map((c) => c.column_name), data };
}

export default async function AdminTable({ params }) {
  const { tableName } = params;
  const { cols, data } = await getTableData(tableName);
  const plainData = data.map((row) => {
    const plainRow = {};
    for (const col of cols) {
      plainRow[col] = parseValue(row[col]);
    }
    return plainRow;
  });

  return (
    <div className="flex flex-col items-center justify-center">
      <h1>Table: {tableName}</h1>
      <DataClient cols={cols} data={plainData} />
    </div>
  );
}
function isJSON(str) {
  try {
    let newJson = JSON.parse(str);
    return (typeof newJson === "object" && newJson !== str) || false;
  } catch (e) {
    return false;
  }
}
const parseValue = (value) => {
  // Check for JSON format
  try {
    const parsed = JSON.parse(value);
    if (Array.isArray(parsed)) {
      return parsed.join(", ");
    }
  } catch (e) {
    // If JSON.parse fails, value is not a JSON string
  }

  // Check for Date format
  if (value instanceof Date) {
    return value.toISOString();
  }
  return value;
};
