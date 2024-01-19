import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SignupForm } from "../_components/_signup/signup-form";

export default function LoginForm() {
  return (
    <div className="h-full flex justify-center items-center bg-gradient-to-br from-indigo-300 to-purple-400">
      <Card className="w-[400px] shadow-md">
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
          <CardDescription>
            Join us! Create a new account to access exciting features and
            personalized content. Fill out the form below to get started.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SignupForm />
        </CardContent>
        <CardFooter className=" flex justify-center">
          <Link href="/auth/login" className="text-sm">
            Already have an account?
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
