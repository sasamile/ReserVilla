"use client";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import React from "react";

function DashboardPage() {
  return (
    <div>
      <Button onClick={() => signOut()}>Sign out</Button>
    </div>
  );
}

export default DashboardPage;
