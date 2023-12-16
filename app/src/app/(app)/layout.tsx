import { UserButton } from "@clerk/nextjs";
import React from "react";
import Breadcrumb from "./breadcrumb";
import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <nav className="h-16 bg-stone-900 p-2 flex items-center">
        <div className="text-xl mx-8 uppercase font-extrabold">Matter</div>
        <Link href="/dashboard">Home</Link>
        <span className="ml-auto">
          <UserButton />
        </span>
      </nav>
      <div className="py-4 min-h-[calc(100vh-4rem)] mx-auto flex flex-col container">
        <Breadcrumb />
        <div className="my-4 h-full flex flex-col flex-1">{children}</div>
      </div>
    </div>
  );
}
