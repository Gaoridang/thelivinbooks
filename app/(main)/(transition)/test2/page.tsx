"use client";

import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const Test2Page = () => {
  const router = useRouter();

  return (
    <div className="flex h-screen items-center justify-center">
      <motion.div
        layoutId="expandable-box"
        className="bg-yellow flex w-full items-center justify-center"
      >
        <button className="w-48 p-4" onClick={() => router.push("/test1")}>
          Go to Test1
        </button>
      </motion.div>
    </div>
  );
};

export default Test2Page;
