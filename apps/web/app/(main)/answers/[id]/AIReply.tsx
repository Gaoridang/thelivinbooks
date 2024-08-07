'use client';

import { supabase } from '@/app/utils/supabase/client';
import { useEffect, useState } from 'react';

interface Props {
  reply?: string;
}

const AIReply = ({ reply }: Props) => {
  const [newReply, setNewReply] = useState(reply);

  const replyContent = newReply?.replace(/\<\/?comment\>/g, '') || '답변 준비 중입니다.';

  useEffect(() => {
    const subscription = supabase
      .channel('ai_replies')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'ai_replies',
        },
        (payload) => {
          setNewReply(payload.new.content);
        },
      )
      .subscribe();

    return () => {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      subscription.unsubscribe();
    };
  }, []);

  return (
    <div className="space-y-2 border-t pt-4">
      <span className="rounded-full bg-yellow-100 px-2 py-1 text-sm font-semibold text-yellow-800">
        Blogger AI
      </span>
      <p id="ai-reply" className="pl-2">
        {replyContent}
      </p>
    </div>
  );
};

export default AIReply;
