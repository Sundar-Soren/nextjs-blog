"use client";
import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const Sidebar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const isLinkActive = (href: string) => {
    return pathname === href;
  };

  return (
    <aside className="bg-gray-800 h-screen w-64 fixed ">
      <div className="p-4 text-white">
        {/* Logo or Branding */}
        <h1 className="text-xl font-bold">Blog Admin</h1>
      </div>

      <nav className="py-4">
        {/* Navigation Links */}
        <ul className="space-y-2">
          <li>
            <Link href="/dashboard">
              <p
                className={`text-white px-4 py-2 block ${
                  isLinkActive("/dashboard") && "bg-gray-700"
                }`}
              >
                Dashboard
              </p>
            </Link>
          </li>
          <li>
            <Link href="/dashboard/posts">
              <p
                className={`text-white px-4 py-2 block ${
                  isLinkActive("/dashboard/posts") && "bg-gray-700"
                }`}
              >
                Manage Posts
              </p>
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
