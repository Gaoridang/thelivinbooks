"use client";

import React, { useEffect, useRef, useState } from "react";
import { Answer, CategorizedAnswers, Category } from "@/app/types";

import { cn } from "@/lib/utils";
import { supabase } from "@/app/utils/supabase/client";
import { useRouter } from "next/navigation";

import { motion } from "framer-motion";

const categoryOrder: Category[] = ["과거", "현재", "미래"];

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const Answers = () => {
  const [data, setData] = useState<CategorizedAnswers | null>(null);
  const [error, setError] = useState<any>(null);
  const [expandedCategory, setExpandedCategory] = useState("");
  const ulRefs = useRef<{ [key: string]: HTMLUListElement | null }>({});
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = (await supabase.rpc(
        "get_categorized_answers",
      )) as {
        data: CategorizedAnswers;
        error: any;
      };

      if (error) {
        setError(error);
      } else {
        setData(data);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (data) {
      Object.keys(data).forEach((category) => {
        const ul = ulRefs.current[category];
        if (ul) {
          const height = ul.scrollHeight;
          ul.style.height = `${height}px`;
        }
      });
    }
  }, [data]);

  if (error) {
    return <div>Failed to fetch answers</div>;
  }

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
    <div className="relative flex flex-col gap-4">
      {sortedEntries.map(([category, answers]) => {
        const isExpanded = expandedCategory === category;
        return (
          <div
            key={category}
            className="group"
            onClick={(e) => {
              const target = e.target as HTMLElement;

              if (expandedCategory === category) {
                setExpandedCategory("");
              } else {
                setExpandedCategory(category);
              }
            }}
            style={{
              zIndex: isExpanded ? 1 : 0,
            }}
          >
            {isExpanded && (
              <motion.div
                className="fixed inset-0 bg-black bg-opacity-50"
                onClick={() => setExpandedCategory("")}
                variants={overlayVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              />
            )}
            <h2 className="mb-4 text-xl font-bold">{category}</h2>
            <ul
              ref={(el) => {
                ulRefs.current[category] = el;
              }}
              className="relative"
            >
              {answers.map((answer, index, answers) => {
                const scale = isExpanded ? 1 : 1 - index * 0.05;
                const baseTranslateY = isExpanded ? index * 150 : index * 15;
                const hoverTranslateY = isExpanded ? index * 150 : index * 20;
                const zIndex = answers.length - index;

                return (
                  <li
                    key={answer.id}
                    className={cn(
                      "absolute left-0 w-full cursor-pointer rounded-xl border-2 bg-white p-4 transition-all duration-300 ease-in-out",
                      "hover:shadow-lg",
                    )}
                    style={{
                      transform: `scale(var(--scale)) translateY(var(--translateY))`,
                      zIndex,
                      ["--scale" as any]: scale,
                      ["--translateY" as any]: `${baseTranslateY}px`,
                      ["--hoverTranslateY" as any]: `${hoverTranslateY}px`,
                    }}
                    onClick={() => {
                      if (isExpanded) {
                        // router.push("/settings");
                      }
                    }}
                  >
                    <div
                      className="transform transition-transform duration-300 ease-in-out"
                      style={{ ["--inverseScale" as any]: 1 / scale }}
                    >
                      <p className="line-clamp-2 font-semibold">
                        {answer.question}
                      </p>
                      <p className="truncate">{answer.title}</p>
                      <p className="truncate">{answer.answer}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </div>
  );
};

export default Answers;
