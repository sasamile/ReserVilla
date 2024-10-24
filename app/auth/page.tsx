import Image from "next/image";
import React from "react";

import FormAuth from "./_components/form";
import { ScrollArea } from "@/components/ui/scroll-area";

function AuthPages() {
  return (
    <div className="relative flex">
      <ScrollArea className="flex-1 h-screen bg-black">
        <FormAuth />
      </ScrollArea>
      <div className="md-plus:block hidden flex-1 relative w-1/2 h-screen">
        <Image
          src="/image/bg-login2.jpg"
          fill
          alt="BG"
          className="object-left object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black to-black/50"></div>
      </div>
    </div>
  );
}

export default AuthPages;
