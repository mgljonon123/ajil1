import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET all settings
export async function GET() {
  const settings = await prisma.setting.findMany({
    select: {
      id: true,
      companyName: true,
      email: true,
      phone: true,
      address: true,
      updatedAt: true,
    },
  });
  return NextResponse.json(settings);
}

// CREATE or UPDATE settings (upsert)
export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const existing = await prisma.setting.findFirst();
    let setting;
    if (existing) {
      setting = await prisma.setting.update({
        where: { id: existing.id },
        data,
        select: {
          id: true,
          companyName: true,
          email: true,
          phone: true,
          address: true,
          updatedAt: true,
        },
      });
    } else {
      setting = await prisma.setting.create({
        data,
        select: {
          id: true,
          companyName: true,
          email: true,
          phone: true,
          address: true,
          updatedAt: true,
        },
      });
    }
    return NextResponse.json(setting);
  } catch (e) {
    return NextResponse.json(
      { error: "Failed to save settings." },
      { status: 500 }
    );
  }
}

// UPDATE settings (alias for POST)
export async function PUT(req: NextRequest) {
  return POST(req);
}

// DELETE a setting by id (expects { id } in body)
export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();
    if (!id) {
      return NextResponse.json({ error: "Missing id" }, { status: 400 });
    }
    await prisma.setting.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json(
      { error: "Failed to delete settings." },
      { status: 500 }
    );
  }
}
