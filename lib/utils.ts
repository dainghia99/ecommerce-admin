import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Định dạng số tiền kiểu Việt Nam
export const formatter = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
});
