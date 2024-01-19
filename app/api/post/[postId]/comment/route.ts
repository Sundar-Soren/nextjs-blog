import { auth } from "@/auth";
import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { postId: string } }
) {
  try {
    const user = await auth();

    const { content } = await req.json();

    if (!content) {
      return new NextResponse("No Content", { status: 404 });
    }

    if (!user || !user.user || !user.user.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const comment = await prismadb.comment.create({
      data: {
        content,
        postId: params.postId,
        userId: user.user.id,
      },
    });

    return NextResponse.json(comment);
  } catch (error) {
    console.log("[COMMENT_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { postId: string } }
) {
  try {
    const comments = await prismadb.comment.findMany({
      where: {
        postId: params.postId,
      },
      include: {
        user: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(comments);
  } catch (error) {
    console.log("[GET_COMMENTS]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
