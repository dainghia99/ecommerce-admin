import prismadb from "@/lib/prismadb";

export const getInventory = async () => {
  const products = await prismadb.product.findMany();
  const result = products.filter((product) => product.isArchived === false);
  return result.length;
};
