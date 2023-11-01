import prismadb from "@/lib/prismadb";
import ColorClient from "./components/client";
import { ColorsColumn } from "./components/columns";
import { format } from "date-fns";

interface ColorsPageProps {
  params: { storeId: string };
}

const ColorsPage: React.FC<ColorsPageProps> = async ({ params }) => {
  const colors = await prismadb.color.findMany({
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

  const formatedColors: ColorsColumn[] = colors.map((item) => {
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
        <ColorClient data={formatedColors} />
      </div>
    </div>
  );
};

export default ColorsPage;
