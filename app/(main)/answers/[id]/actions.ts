"use server";

import { createClient } from "@/app/utils/supabase/server";

export const getFeedback = async (id: string) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("ai_replies")
    .select()
    .eq("with_question_answer_id", id)
    .maybeSingle();

  if (error) {
    return {
      status: "ERROR",
      error,
    };
  }

  if (data) {
    return {
      status: "SUCCESS",
      data,
    };
  }
};
