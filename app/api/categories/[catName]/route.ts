import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

type Params = {
  params: {
    catName: string;
  };
};

export async function GET(req: Request, { params }: Params) {
  const { catName } = params;

  try {
    const posts = await prisma.category.findUnique({
      where: { catName },
      include: {
        posts: { include: { author: true }, orderBy: { createdAt: "desc" } },
      },
    });
    return NextResponse.json(posts);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Could not find post" });
  }
}
