"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

import { AnswerReturnType } from "@/app/types";
import { fetchAnswers } from "@/app/utils/fetchAnswers";
import { useQuery } from "@tanstack/react-query";

interface Props {
  expandedCategory: string;
}

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

  const { data, isLoading } = useQuery<AnswerReturnType>({
    queryKey: ["answers"],
    queryFn: fetchAnswers,
  });

  const handleMouseEnter = (id: string) => {
    // return queryClient.prefetchQuery({
    //   queryKey: ["feedbacks"],
    //   queryFn: () => fetchFeedbacks(id),
    // });
  };

  if (!data || isLoading) return null;

  const expandedData =
    data?.answers.filter((answer) => answer.category === expandedCategory) ||
    [];

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
                {answer.question_content}
              </p>
              <p>{answer.title}</p>
              <p className="line-clamp-2">{answer.content}</p>
            </motion.li>
          );
        })}
      </motion.ul>
    </div>
  );
};

export default AnswerItems;
