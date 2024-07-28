"use client";

import { supabaseService } from "@/app/onboarding/_utils/supabaseService";
import { Category, Question } from "@/app/types";
import { supabase } from "@/app/utils/supabase/client";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import ContentTextArea from "./ContentTextArea";
import TitleInput from "./TitleInput";

interface Props {
  fetchedQuestionId?: string;
  category?: Category;
}

const WritingArea = ({ fetchedQuestionId, category }: Props) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

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
      let questionId = fetchedQuestionId;
      let insertedQuestion: Partial<Question>[];
      if (!questionId) {
        insertedQuestion = await supabaseService.insert<Partial<Question>>(
          "questions",
          {
            content: title,
            category,
          },
        );

        questionId = insertedQuestion[0].id;
      }

      const insertedPost = await supabaseService.insert("profile_answers", {
        title: title,
        answer: content,
        user_id: user.id,
        question_id: questionId,
      });

      if (!insertedPost || insertedPost.length === 0) {
        throw new Error("Failed to insert post");
      }

      router.push(`/dashboard`);
    } catch (error) {
      console.error("Error in handleSubmit:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

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
