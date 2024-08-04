import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";

import { Answer, AnswerReturnType } from "@/app/types";
import { fetchAnswers } from "@/app/utils/fetchAnswers";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { MinusIcon, PlusIcon } from "lucide-react";

interface Props {
  expandedCategory: string;
}

const ListVariants = {
  hidden: {
    y: 20,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const AnswerVariants = {
  hidden: {
    height: 0,
  },
  animate: {
    height: "auto",
  },
  exit: {
    height: 0,
  },
};

const AnswerItems = ({ expandedCategory }: Props) => {
  const router = useRouter();
  const [expandedAnswers, setExpandedAnswers] = useState<string[]>([]);

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

  const handleExpand = (id: string) => {
    if (!expandedAnswers.includes(id)) {
      setExpandedAnswers((prev) => [...prev, id]);
    } else {
      setExpandedAnswers((prev) => {
        return prev.filter((answerId) => answerId !== id);
      });
    }
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
        {expandedData.map((answer) => (
          <AnswerItem
            key={answer.id}
            onToggle={() => handleExpand(answer.id)}
            answer={answer}
            isExpanded={expandedAnswers.includes(answer.id)}
          />
        ))}
      </motion.ul>
    </div>
  );
};

const AnswerItem = ({
  isExpanded,
  answer,
  onToggle,
}: {
  isExpanded: boolean;
  onToggle: () => void;
  answer: Answer;
}) => {
  return (
    <motion.li
      key={answer.id}
      className="border-b bg-white"
      // onMouseEnter={() => handleMouseEnter(answer.id)}
    >
      <div
        className="flex cursor-pointer items-center gap-4"
        onClick={onToggle}
      >
        {isExpanded ? (
          <MinusIcon className="h-4 w-4" />
        ) : (
          <PlusIcon className="h-4 w-4" />
        )}
        <p className="line-clamp-2 max-w-full select-none text-base font-semibold">
          {answer.question_content}
        </p>
      </div>
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className="pl-8"
            initial="collapsed"
            animate="expanded"
            exit="collapsed"
            variants={{
              expanded: { opacity: 1, height: "auto" },
              collapsed: { opacity: 0, height: 0 },
            }}
            transition={{
              duration: 0.3,
              ease: [0.04, 0.62, 0.23, 0.98],
            }}
          >
            <p>{answer.title}</p>
            <p className="line-clamp-2">{answer.content}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.li>
  );
};

export default AnswerItems;
