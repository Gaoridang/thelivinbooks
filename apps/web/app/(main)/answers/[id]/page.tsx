import { createClient } from '@/app/utils/supabase/server';
import { redirect } from 'next/navigation';
import dynamic from 'next/dynamic';
import { ComponentType } from 'react';
import { createAIReply } from '@/app/utils/createAIReply';

interface AIReplyProps {
  reply: string | undefined;
}

const AIReply: ComponentType<AIReplyProps> = dynamic(() => import('./AIReply'));

interface Props {
  params: { id: string };
}

const AnswerPage = async ({ params }: Props) => {
  const supabase = createClient();

  const { data: answer, error: ANSWER_ERROR } = await supabase
    .from('user_answers_with_question')
    .select()
    .eq('id', params.id)
    .single();

  const { data: reply, error: REPLY_ERROR } = await supabase
    .from('ai_replies')
    .select('content')
    .eq('with_question_answer_id', params.id)
    .maybeSingle();

  if (!reply) {
    // eslint-disable-next-line
    createAIReply(
      params.id,
      `- title: ${answer?.title}
        - content: ${answer?.content}` || '나를 위한 질문 몇 가지를 해줘',
    );
  }

  if (ANSWER_ERROR || REPLY_ERROR) {
    redirect('/error');
  }

  return (
    <div>
      <h2 id="title" className="my-8 text-center text-3xl font-bold">
        {answer?.title}
      </h2>
      <p id="content" className="min-h-48">
        {answer?.content}
      </p>
      <AIReply reply={reply?.content} />
    </div>
  );
};

export default AnswerPage;
