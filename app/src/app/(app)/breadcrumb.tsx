"use client";

import { usePathname } from "next/navigation";

export default function Breadcrumb() {
  const pathname = usePathname();
  return <div>{pathname.replaceAll("/", " / ").trim()}</div>;
}
