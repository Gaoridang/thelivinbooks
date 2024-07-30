"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { createClient } from "../utils/supabase/server";

const createAnswerSchema = z.object({
  title: z.string().min(1, "제목을 입력하세요."),
  content: z.string().min(1, "내용을 입력하세요."),
});

export type CreateAnswerType = z.infer<typeof createAnswerSchema>;

export const createAnswer = async (
  args: any,
  formData: FormData,
): Promise<ActionState | null> => {
  const supabase = createClient();

  const title = formData.get("title");
  const content = formData.get("content");

  const validation = createAnswerSchema.safeParse({
    title,
    content,
  });

  let questionId;
  const { fetchedQuestionId, category } = args;

  if (!fetchedQuestionId) {
    const { data, error } = await supabase
      .from("questions")
      .insert({
        content: title,
        category,
      })
      .select()
      .single();

    if (error) {
      return {
        code: "INTERNAL_ERROR",
        err: error,
      };
    }

    questionId = data.id;
  }

  const { error } = await supabase.from("profile_answers").insert({
    title,
    answer: content,
    question_id: questionId,
  });

  if (error) {
    return {
      code: "INTERNAL_ERROR",
      err: error,
    };
  }

  if (!validation.success) {
    const { fieldErrors } = validation.error.flatten();

    return {
      code: "VALIDATION_ERROR",
      fieldErrors,
    };
  }

  revalidatePath("/dashboard", "layout");
  redirect("/dashboard");
};
