"use client";

import { supabase } from "@/app/utils/supabase/client";
import { useEffect, useState } from "react";

interface Props {
  reply?: string;
}

const AIReply = ({ reply }: Props) => {
  const [newReply, setNewReply] = useState(reply);

  useEffect(() => {
    const subscription = supabase
      .channel("ai_replies")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "ai_replies",
        },
        (payload) => {
          setNewReply(payload.new.content);
        },
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <div className="space-y-2 border-t pt-4">
      <span className="rounded-full bg-yellow-100 px-2 py-1 text-sm font-semibold text-yellow-800">
        Blogger AI
      </span>
      <p className="pl-2">{newReply}</p>
    </div>
  );
};

export default AIReply;
