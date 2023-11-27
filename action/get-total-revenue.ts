import prismadb from "@/lib/prismadb";

export const getTotalRevenue = async (storeId: string) => {
  const paidOrders = await prismadb.order.findMany({
    where: {
      storeId,
      isPaid: true,
    },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
  });

  const totallRevenue = paidOrders.reduce((acc, item) => {
    const orderTotall = item.orderItems.reduce(
      (acc, item) => acc + Number(item.product.price),
      0
    );

    return acc + orderTotall;
  }, 0);

  return totallRevenue;
};
