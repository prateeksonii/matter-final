"use client";

import { HomeIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Children } from "react";

function getLinks(path: string) {
  const links: string[] = [];
  let currentLink = "";
  for (let i = 0; i < path.length; i++) {
    if (path[i] === "/") {
      links.push(currentLink);
    }
    currentLink += path[i];
  }

  links.push(currentLink);

  return links.filter((link) => link.length > 0);
}

export default function Breadcrumb() {
  const pathname = usePathname();
  const links = getLinks(pathname);

  return (
    <div className="text-sm flex items-center gap-1">
      <Link href="/dashboard">
        <HomeIcon className="w-3 h-3" />
      </Link>
      /
      {Children.toArray(
        pathname
          .trim()
          .substring(1)
          .split("/")
          .map((part, i) => (
            <Link key={i} href={links[i]}>
              <span className="text-primary">{part}</span>
              <span> / </span>
            </Link>
          ))
      )}
    </div>
  );
}
