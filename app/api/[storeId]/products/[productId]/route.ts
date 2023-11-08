import { NextResponse } from "next/server"; // Import Next.js NextResponse từ thư viện "next/server".

import prismadb from "@/lib/prismadb"; // Import đối tượng prismadb từ thư mục "@/lib/prismadb".

// Định nghĩa hàm GET cho định tuyến HTTP GET
export async function GET(
  req: Request,
  { params }: { params: { productId: string } }
) {
  try {
    if (!params.productId) {
      return new NextResponse("Product id is required", { status: 400 });
    }

    const product = await prismadb.product.findUnique({
      where: {
        id: params.productId,
      },
      include: {
        images: true,
        category: true,
        size: true,
        color: true,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCT_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

// Định nghĩa hàm DELETE cho định tuyến HTTP DELETE
export async function DELETE(
  req: Request, // Tham số req là đối tượng Request cho HTTP DELETE request
  { params }: { params: { productId: string; storeId: string } } // Trích xuất đối tượng params chứa productId và storeId từ tham số truyền vào
) {
  try {
    if (!params.productId) {
      return new NextResponse("Product id is required", { status: 400 });
    }

    // Tìm cửa hàng (store) dựa trên userId và storeId
    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 405 });
    }

    // Xóa sản phẩm (product)
    const product = await prismadb.product.delete({
      where: {
        id: params.productId,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCT_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

// Định nghĩa hàm PATCH cho định tuyến HTTP PATCH
export async function PATCH(
  req: Request, // Tham số req là đối tượng Request cho HTTP PATCH request
  { params }: { params: { productId: string; storeId: string } } // Trích xuất đối tượng params chứa productId và storeId từ tham số truyền vào
) {
  try {
    const body = await req.json(); // Đọc dữ liệu từ body của HTTP request

    const {
      name,
      price,
      categoryId,
      images,
      colorId,
      sizeId,
      isFeatured,
      isArchived,
    } = body; // Trích xuất các trường dữ liệu từ body

    if (!params.productId) {
      return new NextResponse("Product id is required", { status: 400 });
    }

    // Kiểm tra các trường dữ liệu cần thiết
    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!images || !images.length) {
      return new NextResponse("Images are required", { status: 400 });
    }

    if (!price) {
      return new NextResponse("Price is required", { status: 400 });
    }

    if (!categoryId) {
      return new NextResponse("Category id is required", { status: 400 });
    }

    if (!colorId) {
      return new NextResponse("Color id is required", { status: 400 });
    }

    if (!sizeId) {
      return new NextResponse("Size id is required", { status: 400 });
    }

    // Tìm cửa hàng (store) dựa trên userId và storeId
    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 405 });
    }

    // Cập nhật thông tin sản phẩm (product)
    await prismadb.product.update({
      where: {
        id: params.productId,
      },
      data: {
        name,
        price,
        categoryId,
        colorId,
        sizeId,
        images: {
          deleteMany: {},
        },
        isFeatured,
        isArchived,
      },
    });

    // Thêm các hình ảnh sản phẩm
    const product = await prismadb.product.update({
      where: {
        id: params.productId,
      },
      data: {
        images: {
          createMany: {
            data: [...images.map((image: { url: string }) => image)],
          },
        },
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCT_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
