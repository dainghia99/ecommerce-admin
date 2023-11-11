import prismadb from "@/lib/prismadb";

interface DashboardPageProps {
  params: { storeId: string };
}

export const revalidate = 0;

export default async function DashboardPage({ params }: DashboardPageProps) {
  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId,
    },
  });

  return <div>Active Store: {store?.name}</div>;
}
