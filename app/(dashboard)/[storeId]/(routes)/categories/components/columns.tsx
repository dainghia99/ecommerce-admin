"use client";

import { ColumnDef } from "@tanstack/react-table";
import CellAction from "./cell-action";

export type CategoriesColumn = {
  id: string;
  name: string;
  billboardLabel: string;
  createAt: string;
};

export const columns: ColumnDef<CategoriesColumn>[] = [
  {
    accessorKey: "name",
    header: "Tên",
  },

  {
    accessorKey: "billboard",
    header: "Ảnh quảng cáo",
    cell: ({ row }) => row.original.billboardLabel,
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
