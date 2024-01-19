import { auth } from "@/auth";
import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const user = await auth();

    const { title, editorContent, description } = await req.json();

    if (!title || !editorContent || !description) {
      return new NextResponse("Missing data", { status: 404 });
    }
    if (!user || !user.user || !user.user.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const post = await prismadb.post.create({
      data: {
        blogContent: editorContent,
        userId: user?.user?.id,
        title,
        description,
      },
    });
    return NextResponse.json(post);
  } catch (error) {
    console.log("[CREATE_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET() {
  try {
    const posts = await prismadb.post.findMany();

    return NextResponse.json(posts);
  } catch (error) {
    console.log("[GET_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
