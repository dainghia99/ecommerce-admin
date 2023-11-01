"use client";

import { ColumnDef } from "@tanstack/react-table";
import CellAction from "./cell-action";

export type ColorsColumn = {
  id: string;
  name: string;
  value: string;
  createAt: string;
};

export const columns: ColumnDef<ColorsColumn>[] = [
  {
    accessorKey: "name",
    header: "Tên",
  },
  {
    accessorKey: "value",
    header: "Mã màu",
    cell: ({ row }) => (
      <div className="flex items-center gap-x-2">
        {row.original.value}
        <div
          className="h-6 w-6 rounded-full border"
          style={{ backgroundColor: row.original.value }}
        />
      </div>
    ),
  },
  {
    accessorKey: "createAt",
    header: "Ngày tháng",
  },
  {
    accessorKey: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
    header: "Tùy chọn",
  },
];
