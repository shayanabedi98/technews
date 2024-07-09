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
    const post = await prisma.post.findUnique({ where: { id } });
    return NextResponse.json(post);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Could not find post" });
  }
}

export async function PUT(req: Request, { params }: Params) {
  const { title, content, links, selectedCategory, imageUrl, publicId } =
    await req.json();
  const { id } = params;
  try {
    const post = await prisma.post.update({
      where: { id },
      data: {
        title,
        content,
        links,
        catName: selectedCategory,
        imageUrl,
        publicId,
      },
    });
    return NextResponse.json(post);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Could not update post" });
  }
}

export async function DELETE(req: Request, { params }: Params) {
  const { id } = params;
  try {
    const post = await prisma.post.delete({ where: { id } });
    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json({ message: "Could not delete post" });
  }
}
