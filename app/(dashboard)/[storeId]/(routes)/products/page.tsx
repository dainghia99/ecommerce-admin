import prismadb from "@/lib/prismadb";
import { ProductColumn } from "./components/columns";
import { format } from "date-fns";
import { formatter } from "@/lib/utils";
import ProductClient from "./components/client";

interface ProductPageProps {
  params: { storeId: string };
}

const ProductPage: React.FC<ProductPageProps> = async ({ params }) => {
  const products = await prismadb.product.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      category: true,
      size: true,
      color: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const test = await prismadb.product.findMany();
  console.log(test);

  const daysOfWeek = [
    "Chủ Nhật",
    "Thứ Hai",
    "Thứ Ba",
    "Thứ Tư",
    "Thứ Năm",
    "Thứ Sáu",
    "Thứ Bảy",
  ];

  const formatedProducts: ProductColumn[] = products.map((item) => {
    const currentDate = item.createdAt;
    const dayIndex = currentDate.getDay();
    const dayName = daysOfWeek[dayIndex];
    return {
      id: item.id,
      name: item.name,
      price: formatter.format(item.price.toNumber()),
      isFeatured: item.isFeatured,
      isArchived: item.isArchived,
      category: item.category.name,
      size: item.size.name,
      color: item.color.value,
      colorName: item.color.name,
      createAt: dayName + ", " + format(item.createdAt, "dd/MM/yyyy"),
    };
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductClient data={formatedProducts} />
      </div>
    </div>
  );
};

export default ProductPage;
