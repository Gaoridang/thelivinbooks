"use client";

import React, { useEffect, useRef, useState } from "react";
import { Answer, CategorizedAnswers, Category } from "@/app/types";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

import { useQuery } from "@tanstack/react-query";
import { fetchAnswers } from "@/app/utils/getCategorizedAnswers";

const categoryOrder: Category[] = ["과거", "현재", "미래"];

const ListVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const ItemVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
};

const Answers = () => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const router = useRouter();

  const { data } = useQuery({
    queryKey: ["answers"],
    queryFn: () => fetchAnswers(),
  });

  if (!data) {
    return <div>Loading...</div>;
  }

  const sortedEntries: [Category, Answer[]][] = categoryOrder
    .filter(
      (category): category is Category =>
        category in data && Array.isArray(data[category]),
    )
    .map((category) => [category, data[category] || []]);

  return (
    <div className={cn("relative grid grid-cols-3 gap-4")}>
      {sortedEntries.map(([category, answers]) => {
        return (
          <div key={category}>
            <motion.div
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
                  setExpandedCategory(null);
                } else {
                  setExpandedCategory(category);
                }
              }}
            >
              <motion.h2 className="text-center text-xl font-bold">
                {category}
              </motion.h2>
            </motion.div>
            {expandedCategory === category && (
              <motion.ul
                className="absolute left-0 top-full mt-4 grid gap-4"
                variants={ListVariants}
                initial="hidden"
                animate="visible"
              >
                {answers.map((answer) => {
                  return (
                    <motion.li
                      key={answer.id}
                      variants={ItemVariants}
                      className={cn(
                        "cursor-pointer rounded-xl border-2 bg-white p-4 transition-all duration-300 ease-in-out",
                        "hover:shadow-lg",
                      )}
                      onClick={() => router.push(`/answers/${answer.id}`)}
                    >
                      <p className="line-clamp-2 max-w-full font-semibold">
                        {answer.question}
                      </p>
                      <p>{answer.title}</p>
                      <p className="line-clamp-2">{answer.answer}</p>
                    </motion.li>
                  );
                })}
              </motion.ul>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Answers;
