"use client";

import { supabase } from "@/app/utils/supabase/client";
import React, { useEffect, useState } from "react";

interface Props {
  initialContent: string;
  postId: string;
}

const AIReplyContent = ({ initialContent, postId }: Props) => {
  const [content, setContent] = useState(initialContent);
  useEffect(() => {
    const subscription = supabase.channel("ai_replies").on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "ai_replies",
        filter: `post_id = ${postId}`,
      },
      (payload) => {
        setContent(payload.new.content);
      },
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [postId]);

  return;
};

export default AIReplyContent;
