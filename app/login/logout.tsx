"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import { supabase } from "../utils/supabase/client";
import { useRouter } from "next/navigation";

const LogoutButton = () => {
  const router = useRouter();
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("로그아웃 중 에러가 발생했습니다.", error);
      return;
    } else {
      router.replace("/login");
    }
  };

  return (
    <Button variant="ghost" onClick={handleLogout}>
      로그아웃
    </Button>
  );
};

export default LogoutButton;
