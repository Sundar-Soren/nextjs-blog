import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prismadb from "@/lib/prismadb";
export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();
    if (!email || !password || !name) {
      return new NextResponse("No DATA", { status: 400 });
    }

    const doesUserAlreadyExist = await prismadb?.user.findUnique({
      where: {
        email,
      },
    });
    if (doesUserAlreadyExist) {
      return new NextResponse("User already exist", { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const createdUser = await prismadb?.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
    return NextResponse.json(createdUser);
  } catch (error) {
    console.log("[SIGN_UP]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
