import { oswald } from "@/lib/font";
import { cn } from "@/lib/utils";
import React from "react";
import { Button } from "../ui/button";
import { Spotlight } from "./slipt";

function Hero() {
  return (
    <div className="relative isolate">
      <div className=" text-white text-center max-xl:py-16 pt-6">
        <Spotlight
          className="absolute -top-40 -right-[85%] md:-right-[65%] lg:-right-[60%] md:-top-20 rotate-6 animate-spotlight"
          fill="#A9FF5E"
        />
        <h2
          className={cn(
            "w-[60%] mx-auto text-[80px] leading-[1] font-bold pt-12 bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-300 bg-opacity-50",
            oswald.className
          )}
        >
          <span className="text-[#A9FF5E]">ReserVilla </span>
          Reserva Fácil y Rápido en Villavicencio
        </h2>
        <p className="w-[50%] mx-auto  text-gray-300 py-12 leading-7">
          Encuentra las mejores canchas, salones y espacios para eventos al
          instante. Con ReserVilla, reserva tus espacios favoritos en
          Villavicencio sin complicaciones y con total comodidad. Ahorra tiempo
          y asegúrate de tener el lugar ideal para tu evento, todo desde la
          palma de tu mano.
        </p>
        <Button className="bg-[#A9FF5E] animate-bounce text-black px-6 font-semibold hover:bg-[#597441] hover:text-white">
          Comenzar
        </Button>
      </div>
    </div>
  );
}

export default Hero;
