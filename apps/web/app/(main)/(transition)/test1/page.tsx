"use client";

import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Button } from "@gaoridang/ui";

const Test1Page = () => {
  const router = useRouter();

  return (
    <div className="flex h-screen items-center justify-center">
      <motion.div
        layoutId="expandable-box"
        className="flex w-48 items-center justify-center bg-yellow"
      >
        <button className="w-full p-4" onClick={() => router.push("/test2")}>
          Go to Test2
        </button>
        <Button />
      </motion.div>
    </div>
  );
};

export default Test1Page;
