import prismadb from "@/lib/prismadb";

export const getProductIsOutOfStock = async () => {
  const products = await prismadb.product.findMany();
  const productsOutOfStock = products.filter(
    (product) => product.isArchived === true
  );
  return productsOutOfStock.length;
};
