"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";

const GoProfile = () => {
  const router = useRouter();

  return (
    <Button variant="secondary" onClick={() => router.push("/profile")}>
      프로필 설정
    </Button>
  );
};

export default GoProfile;