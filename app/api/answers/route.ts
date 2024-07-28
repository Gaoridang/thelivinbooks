import { CategorizedAnswers } from "@/app/types";
import { createClient } from "@/app/utils/supabase/server";
import { PostgrestError } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = createClient();
  const { data, error } = (await supabase.rpc("get_categorized_answers")) as {
    data: CategorizedAnswers;
    error: PostgrestError | null;
  };

  if (!data || error) {
    return NextResponse.json(
      { message: "답변을 찾을 수 없습니다." },
      { status: 404 },
    );
  }

  return NextResponse.json({ data }, { status: 200 });
}
