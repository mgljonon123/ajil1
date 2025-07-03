import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET all comments
export async function GET() {
  const comments = await prisma.comment.findMany({
    select: {
      id: true,
      name: true,
      role: true,
      company: true,
      comment: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return NextResponse.json(comments);
}

// CREATE a new comment
export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { name, role, company, comment } = data;
    if (!name || !comment) {
      return NextResponse.json(
        { error: "Name and comment are required" },
        { status: 400 }
      );
    }
    const newComment = await prisma.comment.create({
      data: {
        name,
        role: role || null,
        company: company || null,
        comment,
      },
      select: {
        id: true,
        name: true,
        role: true,
        company: true,
        comment: true,
        createdAt: true,
      },
    });
    return NextResponse.json(newComment);
  } catch (e) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}

// UPDATE a comment
export async function PUT(req: NextRequest) {
  try {
    const data = await req.json();
    const { id, ...rest } = data;
    if (!id) {
      return NextResponse.json({ error: "Missing id" }, { status: 400 });
    }
    const updatedComment = await prisma.comment.update({
      where: { id: String(id) },
      data: rest,
      select: {
        id: true,
        name: true,
        role: true,
        company: true,
        comment: true,
        createdAt: true,
      },
    });
    return NextResponse.json(updatedComment);
  } catch (e) {
    return NextResponse.json({ error: "Update failed" }, { status: 400 });
  }
}

// DELETE a comment by id (expects { id } in body)
export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();
    if (!id) {
      return NextResponse.json({ error: "Missing id" }, { status: 400 });
    }
    await prisma.comment.delete({ where: { id: String(id) } });
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: "Delete failed" }, { status: 400 });
  }
}
