"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="h-screen w-screen bg-no-repeat bg-cover bg-center grid grid-cols-2 place-items-center">
      <div className="bg-stone-950 p-16 rounded-2xl space-y-4">
        <h1 className="text-4xl font-black leading-relaxed">
          Introducing Matter: <br />
          Redefining Agile Project Management
        </h1>
        <ul className="list-disc list-inside">
          <li>Completely free and open source</li>
          <li>Minimalistic design</li>
          <li>Easy to use interface</li>
        </ul>
        <Button size="lg" asChild>
          <Link href="/dashboard">Get started</Link>
        </Button>
      </div>
      <div
        className="w-full h-full bg-cover"
        style={{ backgroundImage: "url(/bg2.png)" }}
      ></div>
    </main>
  );
}
