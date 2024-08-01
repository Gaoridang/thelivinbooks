"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { createClient } from "../utils/supabase/server";
import { SupabaseActionReturnType } from "../types/actionTypes";
import { openai } from "../utils/gpt";
import { prompt } from "./prompt";

const createAnswerSchema = z.object({
  title: z.string().min(1, "제목을 입력하세요."),
  content: z.string().min(1, "내용을 입력하세요."),
  questionId: z.string().optional(),
  category: z.string().optional(),
});

export type CreateAnswerType = z.infer<typeof createAnswerSchema>;
const supabase = createClient();

export const createAnswer = async (
  _prevState: any,
  formData: FormData,
): Promise<SupabaseActionReturnType<CreateAnswerType>> => {
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  let questionId = formData.get("questionId") as string;

  const validation = createAnswerSchema.safeParse({
    title,
    content,
  });

  if (!validation.success) {
    const { fieldErrors } = validation.error.flatten();

    return {
      status: "VALIDATION_ERROR",
      fieldErrors,
    };
  }

  if (questionId) {
    const { data, error } = await supabase
      .from("user_answers_with_question")
      .insert({
        title,
        content,
        question_id: questionId,
      })
      .select();

    if (error) {
      return {
        status: "INSERT_ERROR",
        error: error,
        message: "답변을 추가하는 중에 오류가 발생했습니다.",
      };
    }

    await createAIReply(data[0].id, content, "with_question");
  } else {
    const { data, error } = await supabase
      .from("user_answers_without_question")
      .insert({
        title,
        content,
      })
      .select();

    if (error) {
      return {
        status: "INSERT_ERROR",
        error: error,
        message: "답변을 추가하는 중에 오류가 발생했습니다.",
      };
    }

    await createAIReply(data[0].id, content, "without_question");
  }

  revalidatePath("/dashboard", "layout");
  redirect("/dashboard");
};

async function createAIReply(
  answerId: string,
  content: string,
  answerType: "with_question" | "without_question",
): Promise<SupabaseActionReturnType<{ content: string }>> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini-2024-07-18",
      messages: [
        {
          role: "system",
          content: prompt.replace("{{USER_POST}}", content),
        },
      ],
    });

    const message = response.choices[0].message.content;

    const insertData =
      answerType === "with_question"
        ? { with_question_answer_id: answerId, content: message || "" }
        : { without_question_answer_id: answerId, content: message || "" };

    const { error: POST_REPLY_ERROR } = await supabase
      .from("ai_replies")
      .insert(insertData);

    if (POST_REPLY_ERROR) {
      return {
        status: "INSERT_ERROR",
        error: POST_REPLY_ERROR,
        message: "AI 답변을 생성하는 중에 오류가 발생했습니다.",
      };
    }

    return {
      status: "SUCCESS",
      data: { content: message || "" },
    };
  } catch (error) {
    return {
      status: "INTERNAL_ERROR",
      error: error,
    };
  }
}
