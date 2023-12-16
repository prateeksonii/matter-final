import { cn } from "@/lib/utils";
import React from "react";

interface Props {
  children: React.ReactNode;
  className?: string;
}

export function TypographyH1(props: Props) {
  return (
    <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
      {props.children}
    </h1>
  );
}

export function TypographyLead(props: Props) {
  return (
    <p className={cn("text-xl text-muted-foreground", props.className)}>
      {props.children}
    </p>
  );
}
