"use client";

import { ColumnDef } from "@tanstack/react-table";
import CellAction from "./cell-action";

export type OrderColumn = {
  id: string;
  phone: string;
  address: string;
  isPaid: boolean;
  totalPrice: string;
  products: string;
  createAt: string;
};

export const columns: ColumnDef<OrderColumn>[] = [
  {
    accessorKey: "products",
    header: "Sản phẩm",
  },
  {
    accessorKey: "phone",
    header: "Số điện thoại",
  },
  {
    accessorKey: "address",
    header: "Địa chỉ",
  },
  {
    accessorKey: "totalPrice",
    header: "Tổng số tiền thanh toán",
  },
  {
    accessorKey: "isPaid",
    header: "Trạng thái thanh toán",
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
