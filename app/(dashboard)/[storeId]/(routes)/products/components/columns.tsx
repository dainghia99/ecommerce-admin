"use client";

import { ColumnDef } from "@tanstack/react-table";
import CellAction from "./cell-action";

export type ProductColumn = {
  id: string;
  name: string;
  price: string;
  size: string;
  color: string;
  colorName: string;
  category: string;
  isFeatured: boolean;
  isArchived: boolean;
  createAt: string;
};

export const columns: ColumnDef<ProductColumn>[] = [
  {
    accessorKey: "name",
    header: "Tên",
  },
  {
    accessorKey: "isFeatured",
    header: "Sản phẩm đặc sắc",
  },
  {
    accessorKey: "isArchived",
    header: "Hết hàng",
  },
  {
    accessorKey: "category",
    header: "Thể loại",
  },
  {
    accessorKey: "size",
    header: "Kích thước",
  },
  {
    accessorKey: "color",
    header: "Màu sắc",
    cell: ({ row }) => (
      <div className="flex items-center gap-x-2">
        {row.original.colorName}
        <div
          className="rounded-full w-6 h-6 border"
          style={{ backgroundColor: row.original.color }}
        />
      </div>
    ),
  },
  {
    accessorKey: "price",
    header: "Giá bán",
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
