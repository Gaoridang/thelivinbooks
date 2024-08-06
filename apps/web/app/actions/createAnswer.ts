"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { createClient } from "../utils/supabase/server";
import { SupabaseActionReturnType } from "../types/actionTypes";
import { handlePostgrestError } from "../utils";

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

  const { data, error } = await supabase
    .from("user_answers_with_question")
    .insert({
      title,
      content,
      question_id: questionId || null,
    })
    .select();

  if (error) {
    return handlePostgrestError(error);
  }

  revalidatePath(`/answers/${data[0].id}`, "layout");
  redirect(`/answers/${data[0].id}`);
};
