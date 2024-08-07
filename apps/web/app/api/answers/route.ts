import { AnswerType, CategoryType } from "@/app/types";
import { createClient } from "@/app/utils/supabase/server";
import { PostgrestError } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const supabase = createClient();
  const { data, error } = (await supabase.rpc("get_user_answers_by_category", {
    p_category: searchParams.get("category") || "",
  })) as unknown as {
    data: {
      id: string;
      title: string;
      content: string;
      created_at: string;
      question_content: string | null;
    }[];
    error: PostgrestError | null;
  };

  if (error) {
    return NextResponse.json(
      { message: "답변을 찾을 수 없습니다." },
      { status: 404 },
    );
  }

  if (!data) {
    return NextResponse.json({ data: [] }, { status: 200 });
  }

  return NextResponse.json({ data }, { status: 200 });
}
