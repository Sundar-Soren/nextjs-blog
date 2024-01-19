import { NextResponse } from "next/server";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    if (!email || !password) {
      return new NextResponse("No DATA", { status: 400 });
    }
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    console.log("[LOG_IN]", error);
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return new NextResponse("Invalid credentials!", { status: 500 });
        default:
          return new NextResponse("Something went wrong!", { status: 500 });
      }
    }
    throw error;
  }
}
