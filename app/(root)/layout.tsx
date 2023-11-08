import prismadb from "@/lib/prismadb";
import { redirect } from "next/navigation";

interface SetupLayoutProps {
  children: React.ReactNode;
}

export default async function SetupLayout({ children }: SetupLayoutProps) {
  const stores = await prismadb.store.findMany();

  if (stores.length > 0) {
    redirect(`/${stores[0].id}`);
  }

  return <div>{children}</div>;
}
