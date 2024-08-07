import { Answer } from '@/app/types';
import { fetchAnswers } from '@/app/utils/fetchAnswers';
import { Skeleton } from '@gaoridang/ui/components/ui/skeleton';
import { useQuery } from '@tanstack/react-query';
import { motion, Variants } from 'framer-motion';
import { useState } from 'react';
import AnswerItem from './AnswerItem';

interface Props {
  expandedCategory: string;
}

const ListVariants: Variants = {
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

const AnswerItems = ({ expandedCategory }: Props) => {
  const [expandedAnswers, setExpandedAnswers] = useState<string[]>([]);

  const { data: answers, isLoading } = useQuery<Answer[]>({
    queryKey: ['answers', expandedCategory],
    queryFn: () => fetchAnswers(expandedCategory),
  });

  const handleExpand = (id: string) => {
    if (!expandedAnswers.includes(id)) {
      setExpandedAnswers((prev) => [...prev, id]);
    } else {
      setExpandedAnswers((prev) => {
        return prev.filter((answerId) => answerId !== id);
      });
    }
  };

  if (!answers || isLoading)
    return (
      <div className="space-y-4">
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-full" />
      </div>
    );

  return (
    <motion.ul className="grid w-full" variants={ListVariants} initial="hidden" animate="visible">
      {answers.map((answer) => (
        <AnswerItem
          key={answer.id}
          onToggle={() => handleExpand(answer.id)}
          answer={answer}
          isExpanded={expandedAnswers.includes(answer.id)}
        />
      ))}
    </motion.ul>
  );
};

export default AnswerItems;
