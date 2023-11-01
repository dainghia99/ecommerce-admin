import prismadb from "@/lib/prismadb";
import BillboardClient from "./components/client";
import { SizesColumn } from "./components/columns";
import { format } from "date-fns";

interface SizesPageProps {
  params: { storeId: string };
}

const SizesPage: React.FC<SizesPageProps> = async ({ params }) => {
  const sizes = await prismadb.size.findMany({
    where: {
      storeId: params.storeId,
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

  const formatedSizes: SizesColumn[] = sizes.map((item) => {
    const currentDate = item.createAt;
    const dayIndex = currentDate.getDay();
    const dayName = daysOfWeek[dayIndex];
    return {
      id: item.id,
      name: item.name,
      value: item.value,
      createAt: dayName + ", " + format(item.createAt, "dd/MM/yyyy"),
    };
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardClient data={formatedSizes} />
      </div>
    </div>
  );
};

export default SizesPage;
