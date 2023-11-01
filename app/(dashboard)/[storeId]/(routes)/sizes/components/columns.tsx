"use client";

import { ColumnDef } from "@tanstack/react-table";
import CellAction from "./cell-action";

export type SizesColumn = {
  id: string;
  name: string;
  value: string;
  createAt: string;
};

export const columns: ColumnDef<SizesColumn>[] = [
  {
    accessorKey: "name",
    header: "Tên",
  },
  {
    accessorKey: "value",
    header: "Kích cỡ",
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
