// import { openai } from "@/app/utils/gpt";
// import { createClient } from "@/app/utils/supabase/server";
// import { NextRequest, NextResponse } from "next/server";
// import { prompt } from "../prompts";
// import { anthropic } from "@/app/utils/anthropic";

// export async function GET(req: NextRequest) {
//   const supabase = createClient();
//   const { data: interests } = await supabase.rpc("get_current_user_interests");

//   const response = await anthropic.messages.create({
//     model: "claude-3-5-sonnet-20240620",
//     max_tokens: 300,
//     messages: [
//       {
//         role: "user",
//         content: prompt.replace("{{INTERESTS}}", interests),
//       },
//     ],
//   });

//   const message =
//     response.content[0].type === "text" ? response.content[0].text : "";

//   if (!message) {
//     return NextResponse.json({ message: "No message found" }, { status: 500 });
//   }

//   console.log("Anthropic response:", message);
//   // 정규표현식을 수정하여 더 유연하게 질문을 찾습니다.
//   const regex = /<questions>([\s\S]*?)<\/questions>/;
//   const match = message.match(regex);

//   console.log("Matched questions:", match);

//   if (match && match[1]) {
//     const questionsText = match[1].trim();

//     console.log("Questions text:", questionsText);

//     const questions = questionsText
//       .split(/\d+\.\s*/)
//       .filter((q) => q.trim() !== "")
//       .map((question) => ({ question: question.trim() }));

//     console.log("Parsed questions:", questions);

//     if (questions.length === 0) {
//       return NextResponse.json(
//         { message: "No valid questions found after parsing" },
//         { status: 500 },
//       );
//     }

//     const { data: storedQuestions, error } = await supabase
//       .from("questions")
//       .insert(questions)
//       .select();

//     if (error) {
//       return NextResponse.json(
//         { message: "Failed to store questions", error: error.message },
//         { status: 500 },
//       );
//     }

//     return NextResponse.json({ questions: storedQuestions }, { status: 200 });
//   } else {
//     return NextResponse.json(
//       { message: "No questions found in Claude's response" },
//       { status: 500 },
//     );
//   }
// }
