"use client";

import { cn } from "@gaoridang/ui/lib/utils";
import { motion } from "framer-motion";
import { useState } from "react";
import AnswerItems from "./Answers";

const categories = ["과거", "현재", "미래", "기타"];

const AnswersContainer = () => {
  const [expandedCategory, setExpandedCategory] = useState("과거");

  return (
    <div className="relative">
      <h2 className="my-8 text-center text-2xl font-bold">나의 이야기</h2>
      <div className="flex gap-8">
        <div className="flex-grow">
          {expandedCategory && (
            <AnswerItems expandedCategory={expandedCategory} />
          )}
        </div>
        <div className="sticky top-10 h-fit">
          {categories.map((category) => (
            <motion.div
              key={category}
              className="relative cursor-pointer p-2"
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
      </div>
    </div>
  );
};

export default AnswersContainer;
