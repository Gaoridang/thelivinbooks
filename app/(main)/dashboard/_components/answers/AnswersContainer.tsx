"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";
import AnswerItems from "./Answers";
import { cn } from "@/lib/utils";
import RecommendedQuestion from "../RecommendedQuestion";

export const categories = ["과거", "현재", "미래", "기타"];

const buttonVariants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
};

const AnswersContainer = () => {
  const [expandedCategory, setExpandedCategory] = useState("과거");
  const router = useRouter();

  return (
    <div>
      {/* <motion.button
        onClick={() => router.push("/writing?category=" + expandedCategory)}
        className="w-full p-2 hover:underline hover:underline-offset-2"
        variants={buttonVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        새로운 이야기를 만들어보세요! 📚
      </motion.button> */}
      <h2 className="my-8 text-center text-2xl font-bold">나의 이야기</h2>
      <div className="relative mb-8">
        <div className="absolute right-full top-0 mb-4 mr-4 grid gap-4">
          {categories.map((category) => (
            <motion.div
              key={category}
              className="relative flex cursor-pointer items-center justify-center p-2"
              onClick={() => setExpandedCategory(category)}
            >
              {category === expandedCategory && (
                <motion.div
                  className="absolute bottom-0 left-0 z-0 h-1 w-full bg-yellow"
                  layoutId="underline"
                ></motion.div>
              )}
              <motion.h2
                className={cn(
                  "z-10 whitespace-nowrap text-center text-sm font-semibold",
                  category === expandedCategory ? "opacity-100" : "opacity-30",
                )}
              >
                {category}
              </motion.h2>
            </motion.div>
          ))}
        </div>
        {expandedCategory && (
          <AnswerItems expandedCategory={expandedCategory} />
        )}
      </div>
    </div>
  );
};

export default AnswersContainer;
