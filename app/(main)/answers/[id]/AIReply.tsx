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

  return <div>{newReply}</div>;
};

export default AIReply;
