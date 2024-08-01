"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

import { fetchAnswers } from "@/app/utils/getCategorizedAnswers";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchFeedbacks } from "@/app/utils/getFeedbacks";

interface Props {
  expandedCategory: string;
}

type Answer = {
  id: string;
  question: string;
  title: string;
  answer: string;
};

type Category = "과거" | "현재" | "미래";
export type CategorizedAnswers = {
  [key in Category]: Answer[];
};

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

const AnswerItems = ({ expandedCategory }: Props) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data } = useQuery<CategorizedAnswers>({
    queryKey: ["answers"],
    queryFn: () => fetchAnswers(),
  });

  const handleMouseEnter = (id: string) => {
    return queryClient.prefetchQuery({
      queryKey: ["feedbacks"],
      queryFn: () => fetchFeedbacks(id),
    });
  };

  const expandedData = data?.[expandedCategory as Category];

  return (
    <div className="relative">
      <motion.ul
        className="absolute left-0 top-full mt-4 grid w-full gap-4"
        variants={ListVariants}
        initial="hidden"
        animate="visible"
      >
        {expandedData?.map((answer) => {
          return (
            <motion.li
              key={answer.id}
              variants={ItemVariants}
              className={cn(
                "cursor-pointer rounded-xl border-2 bg-white p-4 transition-all duration-300 ease-in-out",
                "hover:shadow-lg",
              )}
              onMouseEnter={() => handleMouseEnter(answer.id)}
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
        <button
          onClick={() => router.push("/writing?category=" + expandedCategory)}
          className="w-full rounded-lg border bg-slate-800 p-4 text-white transition-colors hover:bg-slate-700"
        >
          나의 새로운 <span className="font-bold">{expandedCategory}</span>{" "}
          이야기를 만들어보세요! 📚
        </button>
      </motion.ul>
    </div>
  );
};

export default AnswerItems;
