"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams, usePathname, useRouter } from "next/navigation";

const MainNav = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) => {
  const pathName = usePathname();
  const params = useParams();

  const routes = [
    {
      href: `/${params.storeId}`,
      lable: "Tổng quan",
      active: pathName === `/${params.storeId}`,
    },
    {
      href: `/${params.storeId}/billboards`,
      lable: "Ảnh quảng cáo",
      active: pathName === `/${params.storeId}/billboards`,
    },
    {
      href: `/${params.storeId}/categories`,
      lable: "Loại sản phẩm",
      active: pathName === `/${params.storeId}/categories`,
    },
    {
      href: `/${params.storeId}/sizes`,
      lable: "Kích cỡ",
      active: pathName === `/${params.storeId}/sizes`,
    },
    {
      href: `/${params.storeId}/colors`,
      lable: "Màu sắc",
      active: pathName === `/${params.storeId}/colors`,
    },
    {
      href: `/${params.storeId}/settings`,
      lable: "Settings",
      active: pathName === `/${params.storeId}/settings`,
    },
  ];

  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)}>
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            "text-sm transition-colors font-medium hover:text-primary",
            route.active
              ? "text-black dark:text-white"
              : "text-muted-foreground"
          )}
        >
          {route.lable}
        </Link>
      ))}
    </nav>
  );
};

export default MainNav;
