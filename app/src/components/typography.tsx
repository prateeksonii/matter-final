import React from "react";

interface Props {
  children: React.ReactNode;
}

export function TypographyH1(props: Props) {
  return (
    <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
      {props.children}
    </h1>
  );
}
