"use client";

import { Button } from "@gaoridang/ui/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";

const GoProfile = () => {
  const router = useRouter();

  return (
    <Button variant="secondary" onClick={() => router.push("/settings")}>
      프로필 설정
    </Button>
  );
};

export default GoProfile;
