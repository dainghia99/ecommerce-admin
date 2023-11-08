import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: Request, params: { storeId: string }) {
  try {
    const body = await req.json();

    const { name } = body;

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    const store = await prismadb.store.create({
      data: {
        name,
      },
    });

    return NextResponse.json(store);
  } catch (err) {
    console.log("STORES_POST", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
