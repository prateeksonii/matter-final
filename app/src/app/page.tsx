"use client";

import Link from "next/link";

export default function Home() {
  return (
    <main
      className="h-screen w-screen bg-no-repeat bg-cover bg-center grid place-items-center"
      style={{ backgroundImage: "url(/bg2.png)" }}
    >
      <div className="bg-stone-950 p-16 rounded-2xl">
        <h1 className="text-4xl font-black">
          <Link href="/dashboard">Project Manager for you</Link>
        </h1>
      </div>
    </main>
  );
}
