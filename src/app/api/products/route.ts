import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET all products
export async function GET() {
  const products = await prisma.product.findMany({
    select: {
      id: true,
      name: true,
      category: true,
      price: true,
      stock: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  return NextResponse.json(products);
}

// CREATE a new product
export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { name, category, price, stock } = data;
    if (!name || !category || price === undefined || stock === undefined) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    const product = await prisma.product.create({
      data: {
        name,
        category,
        price: parseFloat(price),
        stock: parseInt(stock),
      },
      select: {
        id: true,
        name: true,
        category: true,
        price: true,
        stock: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return NextResponse.json(product);
  } catch (e) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}

// UPDATE a product
export async function PUT(req: NextRequest) {
  try {
    const data = await req.json();
    const { id, ...rest } = data;
    if (!id) {
      return NextResponse.json({ error: "Missing id" }, { status: 400 });
    }
    const product = await prisma.product.update({
      where: { id: String(id) },
      data: rest,
      select: {
        id: true,
        name: true,
        category: true,
        price: true,
        stock: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return NextResponse.json(product);
  } catch (e) {
    return NextResponse.json({ error: "Update failed" }, { status: 400 });
  }
}

// DELETE a product by id (expects { id } in body)
export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();
    if (!id) {
      return NextResponse.json({ error: "Missing id" }, { status: 400 });
    }
    await prisma.product.delete({ where: { id: String(id) } });
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: "Delete failed" }, { status: 400 });
  }
}
