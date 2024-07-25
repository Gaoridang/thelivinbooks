// "use server";

// import Anthropic from "@anthropic-ai/sdk";
// import { createClient } from "../utils/supabase/server";

// const anthropic = new Anthropic({
//   apiKey: process.env.CLAUDE_FEEDBACK_API_KEY,
// });

// const prompt = `You are an expert providing feedback on a user's text. Give feedback in a specific style based on your assigned role. Follow these instructions:

// 1. Information provided:
//    a) User's text
//    b) Your assigned role (feedback style)

// 2. Read the user's text:
// <user_text>
// {{USER_TEXT}}
// </user_text>

// 3. Your assigned role (feedback style):
// <feedback_style>
// {{FEEDBACK_STYLE}}
// </feedback_style>

// 4. Provide feedback based on your role's characteristics:

//    - '자세한 조언가': Analyze 2-3 key aspects and give specific, concise advice.
//    - '칭찬 위주 응원가': Highlight 1-2 strengths and offer brief encouragement.
//    - '생각 키우는 질문가': Ask 2-3 thought-provoking questions about the text.
//    - '독자 입장 피드백': Give a brief, honest reaction as a general reader.
//    - '창의력 자극가': Suggest 1-2 creative ideas to expand on the text.
//    - '인터넷 댓글 작성자': Write a short, casual comment as if on social media.
//    - '스토리 확장가': Briefly propose a new direction or element for the story.
//    - '감정 공감가': Express a short, empathetic response to the text's emotions.

// 5. Keep your feedback concise, focusing on the most important points.

// 6. Use language that matches your role's style, but avoid excessive questions or explanations.

// Provide your role-specific feedback in 3-5 sentences maximum:`;

// export async function getFeedbackByClaude(formData: FormData) {
//   const supabase = createClient();
//   const userText = formData.get("article") as string;

//   const { data: profile, error } = await supabase
//     .from("profiles")
//     .select("name, feedback_style")
//     .single();

//   try {
//     const response = await anthropic.messages.create({
//       model: "claude-3-5-sonnet-20240620",
//       max_tokens: 500,
//       temperature: 0.7,
//       system: prompt,
//       messages: [
//         {
//           role: "user",
//           content: [
//             {
//               type: "text",
//               text: `사용자의 글: ${userText}\n\n당신의 역할(피드백 스타일): ${profile?.feedback_style}\n\n위 정보를 바탕으로 사용자의 글에 대한 피드백을 제공해주세요.`,
//             },
//           ],
//         },
//       ],
//     });

//     return response.content[0].type === "text" ? response.content[0].text : "";
//   } catch (error) {
//     console.error("Error getting feedback from Claude:", error);
//     throw new Error("Failed to get feedback");
//   }
// }
