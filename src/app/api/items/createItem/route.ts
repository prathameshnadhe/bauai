import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { title, description, userId } = reqBody;

    // Validate the request
    if (!title || !description || !userId) {
      return NextResponse.json(
        { error: "Title, description, and userId are required" },
        { status: 400 }
      );
    }

    // Create new item in the database
    const newItem = await prisma.item.create({
      data: {
        title,
        description,
        createdAt: new Date(),
        userId,
      },
    });

    return NextResponse.json(
      {
        message: "Item created successfully",
        success: true,
        item: newItem,
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
