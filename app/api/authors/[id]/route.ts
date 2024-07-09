import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

type Params = {
  params: {
    id: string;
  };
};

export async function GET(req: Request, { params }: Params) {
  const { id } = params;

  try {
    const posts = await prisma.user.findUnique({
      where: { id },
      include: {
        posts: { orderBy: { createdAt: "desc" } },
      },
    });
    return NextResponse.json(posts);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Could not find post" });
  }
}
