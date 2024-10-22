import { oswald2 } from "@/lib/font";
import Image from "next/image";
import React from "react";

interface FormWrapper {
  children: React.ReactNode;
  setIsChange: (value: "login" | "register") => void;
  ischange: "login" | "register";
}

function FormWrapper({ children, setIsChange, ischange }: FormWrapper) {
  return (
    <div className="p-8 text-white">
      <div className="flex jus gap-4 text-white font-bold items-center ">
        <Image src="/image/Logo.svg" width={60} height={80} alt="Logo" />
        <h2 className="text-2xl">ReserVilla</h2>
      </div>

      <div className=" pt-8 px-16">
  
        <h2 className={` text-4xl py-4 font-bold`}>
          {ischange === "login" ? <>Inicia sesión</> : <>Registrarse</>}
        </h2>
        <p>
          Si no tienes una cuenta?{" "}
          <span
            className="text-green-500 cursor-pointer"
            onClick={() =>
              ischange === "login"
                ? setIsChange("register")
                : setIsChange("login")
            }
          >
            {ischange === "login" ? <>Regístrese</> : <>Inicia sesión</>}
          </span>
        </p>
        <div>{children}</div>
      </div>
    </div>
  );
}

export default FormWrapper;
