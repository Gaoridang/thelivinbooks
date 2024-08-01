import { createClient } from "@/app/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";
import { openai } from "@/app/utils/gpt";
import { prompt } from "../prompt";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const supabase = createClient();

  console.log(params.id);

  const { data, error } = await supabase
    .from("profile_answers")
    .select("answer")
    .eq("question_id", params.id)
    .single();

  if (error) {
    return NextResponse.json({ message: error }, { status: 404 });
  } else {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini-2024-07-18",
      messages: [
        {
          role: "system",
          content: prompt.replace("{{USER_POST}}", data.answer),
        },
      ],
    });

    const message = response.choices[0].message.content;
    return NextResponse.json({ data: message }, { status: 200 });
  }
}
