import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function DELETE(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { id } = reqBody;

    // Validate the request
    if (!id) {
      return NextResponse.json(
        { error: "Item ID is required" },
        { status: 400 }
      );
    }

    // Delete the item from the database
    const deletedItem = await prisma.item.delete({
      where: { id },
    });

    return NextResponse.json(
      {
        message: "Item deleted successfully",
        success: true,
        item: deletedItem,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
