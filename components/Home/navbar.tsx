"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { Button } from "../ui/button";

function Navbar() {
  const pathname = usePathname();
  return (
    <div>
      <div className="flex justify-between items-center px-12 py-4">
        <Image src={"/image/Logo.svg"} height={70} width={70} alt="Logo" />
        <div className="text-white space-x-12 ">
          <Link
            href={"/"}
            className={`${pathname === "/" && "text-[#A9FF5E]"} `}
          >
            Inicio
          </Link>
          <Link
            href={"/promociones"}
            className={`${pathname === "/promociones" && "text-[#A9FF5E]"} `}
          >
            Promociones
          </Link>
        </div>
        <div>
          <Link href={"/auth"}>
            <Button className="border-[#A9FF5E] border-2 bg-transparent hover:bg-inherit px-7">Sign-in</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
