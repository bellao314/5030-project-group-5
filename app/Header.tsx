"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { CSSProperties } from "react";

export default function Header() {
  const { data: session } = useSession();

  return (
    <header className="w-full bg-black shadow-md py-4 px-8">
      <nav className="flex justify-between items-center" style={{color: "white"}}>
        <Link href="/" className="text-xl font-bold text-gray-50 hover:text-blue-600 transition-colors">
          STL Emergency ROI Dashboard
        </Link>
      </nav>
    </header>
  );
}
