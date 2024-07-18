"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import { PencilIcon } from "lucide-react";
import { useRouter } from "next/navigation";

const Actions = () => {
  const router = useRouter();

  return (
    <Button className="h-12 w-12 p-2" onClick={() => router.push("/writing")}>
      <PencilIcon />
    </Button>
  );
};

export default Actions;
