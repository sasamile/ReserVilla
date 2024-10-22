import Image from "next/image";
import React from "react";
import FormLogin from "./_components/form";
import FormAuth from "./_components/form";

function AuthPages() {
  return (
    <div className="relative flex">
      <div className="w-1/2 h-screen bg-black">
        {/* Formulario de login */}
        <FormAuth />
      </div>
      <div className="relative w-1/2 h-screen">
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
