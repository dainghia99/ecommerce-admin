import prismadb from "@/lib/prismadb";
import { CategoriesColumn } from "./components/columns";
import { format } from "date-fns";
import CategoryClient from "./components/client";

interface CategoriesPageProps {
  params: { storeId: string };
}

const CategoriesPage: React.FC<CategoriesPageProps> = async ({ params }) => {
  const categories = await prismadb.category.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      billboard: true,
    },
    orderBy: {
      createAt: "desc",
    },
  });

  const daysOfWeek = [
    "Chủ Nhật",
    "Thứ Hai",
    "Thứ Ba",
    "Thứ Tư",
    "Thứ Năm",
    "Thứ Sáu",
    "Thứ Bảy",
  ];

  const formatedCategories: CategoriesColumn[] = categories.map((item) => {
    const currentDate = item.createAt;
    const dayIndex = currentDate.getDay();
    const dayName = daysOfWeek[dayIndex];
    return {
      id: item.id,
      name: item.name,
      billboardLabel: item.billboard.label,
      createAt: dayName + ", " + format(item.createAt, "dd/MM/yyyy"),
    };
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryClient data={formatedCategories} />
      </div>
    </div>
  );
};

export default CategoriesPage;
