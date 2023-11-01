import prismadb from "@/lib/prismadb";
import BillboardClient from "./components/billboard-client";
import { BillboardColumn } from "./components/columns";
import { format } from "date-fns";

interface BillboardPageProps {
  params: { storeId: string };
}

const BillboardPage: React.FC<BillboardPageProps> = async ({ params }) => {
  const billboards = await prismadb.billboard.findMany({
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

  const formatedBillboards: BillboardColumn[] = billboards.map((item) => {
    const currentDate = item.createAt;
    const dayIndex = currentDate.getDay();
    const dayName = daysOfWeek[dayIndex];
    return {
      id: item.id,
      label: item.label,
      createAt: dayName + ", " + format(item.createAt, "dd/MM/yyyy"),
    };
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardClient data={formatedBillboards} />
      </div>
    </div>
  );
};

export default BillboardPage;
