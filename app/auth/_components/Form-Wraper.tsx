"use client";

import { Logo } from "@/components/logo";

interface FormWrapper {
  children: React.ReactNode;
  setIsChange: (value: "login" | "register") => void;
  ischange: "login" | "register";
}

function FormWrapper({ children, setIsChange, ischange }: FormWrapper) {
  return (
    <div className="ms:p-8 xs:p-6 p-4 text-white h-full">
      <div className="pt-8 xl:px-16 w-fit mx-auto">
        <Logo />
        <h2 className="text-3xl py-4 font-bold mt-6">
          {ischange === "login" ? <>Inicia sesión</> : <>Crea una cuenta</>}
        </h2>
        <p className="text-muted/70 select-none">
          {ischange === "login"
            ? "No tienes una cuenta?"
            : "Ya tienes una cuenta?"}{" "}
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
