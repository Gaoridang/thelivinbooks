import { Answer } from '@/app/types';
import { ArrowRight, MinusIcon, PlusIcon } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

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
      className="mb-2 border-b bg-white"
      // onMouseEnter={() => handleMouseEnter(answer.id)}
    >
      <div role="button" className="flex cursor-pointer items-center" onClick={onToggle}>
        <div className="mr-4 flex h-4 w-4 items-center justify-center">
          {isExpanded ? <MinusIcon className="h-4 w-4" /> : <PlusIcon className="h-4 w-4" />}
        </div>
        <p className="line-clamp-2 max-w-full select-none text-base font-semibold">
          {answer.question_content || answer.title}
        </p>
      </div>
      <motion.div className="ml-8 overflow-hidden" style={{ marginBlock: '0.5rem' }}>
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial="collapsed"
              animate="expanded"
              exit="collapsed"
              variants={{
                expanded: { opacity: 1, height: 'auto' },
                collapsed: { opacity: 0, height: 0 },
              }}
              transition={{
                duration: 0.3,
                ease: [0.04, 0.62, 0.23, 0.98],
              }}
            >
              <Link
                href={`/answers/${answer.id}`}
                className="group flex items-center justify-between gap-4"
              >
                <div>
                  <p>{answer.title}</p>
                  <p className="line-clamp-2">{answer.content}</p>
                </div>
                <div>
                  <ArrowRight className="mr-2 h-6 w-6 rounded-full bg-yellow p-1 transition-all group-hover:translate-x-2" />
                </div>
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.li>
  );
};

export default AnswerItem;
