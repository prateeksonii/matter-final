import { UserButton, auth } from "@clerk/nextjs";
import React from "react";
import Breadcrumb from "./breadcrumb";
import Link from "next/link";
import { db } from "@/db/conn";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

async function checkUserCreation() {
  return new Promise((res, rej) => {
    const interval = setInterval(async () => {
      const { userId } = auth();
      const signedInUser = await db
        .select()
        .from(users)
        .where(eq(users.clerkId, userId!));

      if (signedInUser.length > 0) {
        clearInterval(interval);
        res(true);
      }
    }, 1000);
  });
}

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await checkUserCreation();
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
