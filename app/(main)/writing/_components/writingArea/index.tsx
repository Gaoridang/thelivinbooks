"use client";

import { supabaseService } from "@/app/onboarding/_utils/supabaseService";
import { Button } from "@/components/ui/button";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { useState } from "react";
import AIrecommendTopic from "../AIrecommendTopic";
import ContentTextArea from "./ContentTextArea";
import TitleInput from "./TitleInput";
import { supabase } from "@/app/utils/supabase/client";

interface Props {
  user: User | null;
  questionId: string;
}

const WritingArea = ({ user, questionId }: Props) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    if (!user) {
      console.error("User is not logged in");
      return;
    }

    if (!title.trim() || !content.trim()) {
      console.error("Title and content are required");
      return;
    }

    setIsSubmitting(true);

    try {
      const insertedPost = await supabaseService.insert("profile_answers", {
        answer: content,
        user_id: user.id,
        question_id: questionId,
      });

      if (!insertedPost || insertedPost.length === 0) {
        throw new Error("Failed to insert post");
      }

      const post = insertedPost[0];

      // router.push(`/posts/${post.id}`);
    } catch (error) {
      console.error("Error in handleSubmit:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // const generateAIReply = async (post: {
  //   id: string;
  //   title: string;
  //   content: string;
  //   user_id: string;
  // }) => {
  //   try {
  //     const { error: functionError } = await supabase.functions.invoke(
  //       "process-new-post",
  //       {
  //         body: JSON.stringify({
  //           postId: post.id,
  //           title: post.title,
  //           content: post.content,
  //           userId: post.user_id,
  //         }),
  //       },
  //     );

  //     if (functionError) {
  //       console.error("Failed to generate AI reply:", functionError);
  //     } else {
  //       console.log("AI reply generated successfully");
  //       // Optionally, you can trigger a notification here
  //     }
  //   } catch (error) {
  //     console.error("Error generating AI reply:", error);
  //   }
  // };

  const handleChangeTitle = (value: string) => {
    setTitle(value);
  };

  const handleChangeContent = (value: string) => {
    setContent(value);
  };

  return (
    <div className="grid gap-4">
      <TitleInput value={title} onChange={handleChangeTitle} />
      <ContentTextArea value={content} onChange={handleChangeContent} />
      <div>
        <Button
          className="bg-yellow text-black hover:bg-yellow-200"
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? "처리 중..." : "발행"}
        </Button>
      </div>
    </div>
  );
};

export default WritingArea;
