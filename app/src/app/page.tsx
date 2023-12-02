"use client";

import { signUp } from "@/actions/auth";
import Link from "next/link";
import { useFormState } from "react-dom";

export default function Home() {
  return (
    <main
      className="h-screen w-screen bg-no-repeat bg-cover bg-center grid place-items-center"
      style={{ backgroundImage: "url(/bg2.png)" }}
    >
      <div className="bg-shark-50 p-16 rounded-2xl">
        <h1 className="text-4xl font-black"><Link href="/dashboard">Get Started now</Link></h1>
      </div>
    </main>
  );
}
