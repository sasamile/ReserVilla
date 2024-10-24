"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "../ui/button";
import { Logo } from "../logo";

function Navbar() {
  const pathname = usePathname();
  return (
    <div>
      <div className="flex justify-between items-center px-12 py-4">
        <Logo hideText />
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
            <Button className="border-[#A9FF5E] border-2 bg-transparent hover:bg-inherit px-7">
              Sign-in
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
