import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { postId: string } }
) {
  try {
    const post = await prismadb.post.findUnique({
      where: {
        id: params.postId,
      },
    });
    return NextResponse.json(post);
  } catch (error) {
    console.log("[GET_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
