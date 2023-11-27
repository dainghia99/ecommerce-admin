// Import thư viện Stripe và NextResponse từ Next.js
import Stripe from "stripe";
import { NextResponse } from "next/server";

// Import các module stripe, prismadb từ thư mục lib
import { stripe } from "@/lib/stripe";
import prismadb from "@/lib/prismadb";

// Định nghĩa các headers cho CORS (Cross-Origin Resource Sharing)
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

// Xử lý request OPTIONS để hỗ trợ CORS
export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

// Xử lý request POST
export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  // Lấy thông tin productIds từ request body
  const { productIds } = await req.json();

  // Kiểm tra nếu không có productIds hoặc productIds rỗng, trả về lỗi 400
  if (!productIds || productIds.length === 0) {
    return new NextResponse("Product ids are required", { status: 400 });
  }

  // Lấy thông tin các sản phẩm từ database
  const products = await prismadb.product.findMany({
    where: {
      id: {
        in: productIds,
      },
    },
  });

  // Tạo danh sách line_items để truyền vào Stripe Checkout Session
  const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

  // Duyệt qua danh sách sản phẩm và thêm vào line_items
  products.forEach((product) => {
    line_items.push({
      quantity: 1,
      price_data: {
        currency: "VND",
        product_data: {
          name: product.name,
        },
        unit_amount: product.price.toNumber(),
      },
    });
  });

  // Tạo đơn hàng mới trong database
  const order = await prismadb.order.create({
    data: {
      storeId: params.storeId,
      isPaid: false,
      orderItems: {
        create: productIds.map((productId: string) => ({
          product: {
            connect: {
              id: productId,
            },
          },
        })),
      },
    },
  });

  // Tạo Stripe Checkout Session
  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: "payment",
    billing_address_collection: "required",
    phone_number_collection: {
      enabled: true,
    },
    success_url: `${process.env.FRONTEND_STORE_URL}/cart?success=1`,
    cancel_url: `${process.env.FRONTEND_STORE_URL}/cart?canceled=1`,
    metadata: {
      orderId: order.id,
    },
  });

  // Trả về response JSON chứa URL của Stripe Checkout Session
  return NextResponse.json(
    { url: session.url },
    {
      headers: corsHeaders,
    }
  );
}
