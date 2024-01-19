"use client";
import React from "react";
import { signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Navbar = () => {
  const { data: session } = useSession();

  console.log(session);

  return (
    <nav className=" border-b border-gray-300 p-4">
      <div className="flex items-center justify-between max-w-screen-xl mx-auto">
        <Link
          href="/"
          className="flex items-center space-x-2 rtl:space-x-reverse"
        >
          <div className="flex gap-1">
            <div className="h-6 w-2 bg-black/50"></div>
            <div className="h-6 w-2 bg-black/70"></div>
            <div className="h-6 w-2 bg-black"></div>
          </div>
          <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
            BlogByte
          </span>
        </Link>

        <div className="flex items-center space-x-4">
          {session && <Button onClick={() => signOut()}>Sign Out</Button>}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
