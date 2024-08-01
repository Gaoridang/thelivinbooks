"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";
import AnswerItems from "./Answers";

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
      <div className="mb-4 grid grid-cols-4 gap-2">
        {categories.map((category) => (
          <motion.div
            key={category}
            className="relative flex cursor-pointer items-center justify-center pb-2"
            onClick={() => setExpandedCategory(category)}
          >
            {category === expandedCategory && (
              <motion.div
                className="absolute bottom-0 left-0 h-[1px] w-full bg-black"
                layoutId="underline"
              ></motion.div>
            )}
            <motion.h2 className="text-center">{category}</motion.h2>
          </motion.div>
        ))}
      </div>
      <motion.button
        onClick={() => router.push("/writing?category=" + expandedCategory)}
        className="w-full p-2 hover:underline hover:underline-offset-2"
        variants={buttonVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        나의 새로운 <span className="font-bold">{expandedCategory}</span>{" "}
        이야기를 만들어보세요! 📚
      </motion.button>
      {expandedCategory && <AnswerItems expandedCategory={expandedCategory} />}
    </div>
  );
};

export default AnswersContainer;
