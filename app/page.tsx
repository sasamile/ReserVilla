import Hero from "@/components/Home/hero";
import Navbar from "@/components/Home/navbar";
import React from "react";

function page() {
  return (
    <div className="h-full bg-black overflow-hidden relative w-full">

      <Navbar />
      <Hero />
    </div>
  );
}

export default page;
