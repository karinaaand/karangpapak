import Link from "next/link";
import type { Route } from "next";
import { ReactNode } from "react";

type ButtonProps = {
  href: Route;
  children: ReactNode;
};

export default function Button({ href, children }: ButtonProps) {
  return (
    <Link
      href={href}
      className="inline-flex items-center justify-center rounded-md border border-white bg-white px-5 py-3 text-sm font-semibold text-[#2c73b9] transition hover:bg-[#f3f7fc]"
    >
      {children}
    </Link>
  );
}