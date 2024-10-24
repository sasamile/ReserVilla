import { cn } from "@/lib/utils";
import Link from "next/link";
import * as React from "react";
import { SVGProps } from "react";

interface LogoProps {
  hideText?: boolean;
  props?: SVGProps<SVGSVGElement>;
}

export function Logo({ props, hideText = false }: LogoProps) {
  return (
    <Link
      href="/"
      className="flex jus gap-4 text-white font-bold items-center "
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={50}
        height={39}
        fill="none"
        {...props}
      >
        <path
          fill="#5b8536"
          d="M16.5 2h21.08L22.083 24.973H1L16.5 2Z"
          className="ccompli1"
        />
        <path
          fill="#a9ff5e"
          d="M17.422 27.102 11.42 36h22.082L49 13.027H32.702l-9.496 14.075h-5.784Z"
          className="ccustom"
        />
      </svg>
      <h2 className={cn("text-2xl", hideText && "hidden")}>ReserVilla</h2>
    </Link>
  );
}
