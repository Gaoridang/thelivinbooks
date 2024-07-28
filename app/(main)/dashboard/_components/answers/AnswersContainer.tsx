"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import AnswerItems from "./Answers";

export const categories = ["과거", "현재", "미래"];

const AnswersContainer = () => {
  const [expandedCategory, setExpandedCategory] = useState("과거");

  return (
    <div>
      <div className="grid grid-cols-3 gap-4">
        {categories.map((category) => (
          <motion.div
            key={category}
            className="flex aspect-square cursor-pointer items-center justify-center rounded-lg border bg-slate-50 p-4"
            whileHover={{
              boxShadow: "0 0 0 2px #000",
              scale: 1.05,
            }}
            animate={{
              boxShadow:
                expandedCategory === category ? "0 0 0 2px #000" : "none",
              scale: expandedCategory === category ? 1.05 : 1,
            }}
            onClick={() => {
              if (expandedCategory === category) {
                setExpandedCategory("");
              } else {
                setExpandedCategory(category);
              }
            }}
          >
            <motion.h2 className="text-center text-xl font-bold">
              {category}
            </motion.h2>
          </motion.div>
        ))}
      </div>
      {expandedCategory && <AnswerItems expandedCategory={expandedCategory} />}
    </div>
  );
};

export default AnswersContainer;
