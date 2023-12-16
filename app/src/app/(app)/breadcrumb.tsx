"use client";

import { usePathname } from "next/navigation";
import { Children } from "react";

export default function Breadcrumb() {
  const pathname = usePathname();
  return (
    <div className="text-sm">
      {Children.toArray(
        pathname
          .trim()
          .split("/")
          .map((part) => (
            <>
              <span className="text-primary">{part}</span>
              <span> / </span>
            </>
          ))
      )}
    </div>
  );
}
