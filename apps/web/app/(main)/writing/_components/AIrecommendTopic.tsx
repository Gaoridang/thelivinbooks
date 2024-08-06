
import { openai } from "@/app/utils/gpt";
import { User } from "@supabase/supabase-js";
import { unstable_cache } from "next/cache";
import React from "react";

interface Props {
  user: User | null;
}

const getCachedResponse = unstable_cache(async () => {
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: "You are a friendly AI assistant.",
      },
      {
        role: "user",
        content: "What should I write about today?",
      },
    ],
    max_tokens: 10,
  });
}, ["ai-recommend-topic"]);

const AIrecommendTopic = async ({ user }: Props) => {
  return (
    <div className="relative mb-4 mr-4 min-w-72 rounded-lg border p-4 xl:absolute xl:right-full">
      <p className="text-muted-foreground"></p>
    </div>
  );
};

export default AIrecommendTopic;
