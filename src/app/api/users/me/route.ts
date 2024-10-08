import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const userId = await getDataFromToken(request);

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        isAdmin: true,
      },
    });

    const res = NextResponse.json({
      message: "User Found",
      data: user,
    });

    return res;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
