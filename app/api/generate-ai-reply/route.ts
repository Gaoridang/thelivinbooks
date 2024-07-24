import { openai } from "@/app/utils/gpt";
import { createClient } from "@/app/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const postId = req.nextUrl.searchParams.get("postId");

  if (!postId) {
    return NextResponse.json(
      { error: "존재하지 않는 게시글 입니다." },
      { status: 400 },
    );
  }

  const supabase = createClient();
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("feedback_style")
    .single();

  if (profileError) {
    return NextResponse.json(
      { error: "프로필을 불러오는 데 실패했습니다." },
      { status: 500 },
    );
  }

  const { data: post, error: postError } = await supabase
    .from("posts")
    .select("title, content")
    .eq("id", postId)
    .single();

  if (!post) {
    return NextResponse.json(
      { error: "게시글을 찾을 수 없습니다." },
      { status: 404 },
    );
  }

  const feedbackStyle = profile?.feedback_style;

  const message = `
    You are an expert providing feedback on a user's text. Give feedback in a specific style based on your assigned role. Follow these instructions:

1. Information provided:
   a) User's text (title and content)
   b) Your assigned role (feedback style)

2. Read the user's text:
<user_text>
Title: ${post.title}
Content: ${post.content}
</user_text>

3. Your assigned role (feedback style):
<feedback_style>
${feedbackStyle}
</feedback_style>

4. Provide feedback based on your role's characteristics:

   - '따뜻한 조언가' (Warm Advisor): 
     - Sincerely praise 1-2 strengths of the text.
     - Gently suggest 1 area for improvement.
     - Conclude by acknowledging the writer's effort and offering encouragement.
     - Maintain a friendly and supportive tone.

   - '비평적 독자' (Critical Reader):
     - Briefly summarize the main points of the text.
     - Offer 1-2 constructive criticisms about the logic or structure of the text.
     - Provide 1 specific suggestion for improvement.
     - Maintain a professional and objective tone, but avoid being overly formal.

   - '창의적 아이디어 제안자' (Creative Idea Proposer):
     - Suggest 1-2 new ideas inspired by the topic or content of the text.
     - Explain how these ideas could make the text more interesting.
     - Compliment the writer's creativity and suggest ways to further develop it.
     - Use an enthusiastic and inspiring tone.

5. Keep your feedback concise, within 3-5 sentences.

6. Use natural language that matches your role, but avoid excessive questions or explanations.

7. Consider both the title and content in your feedback, but don't directly mention them in your response.

8. Provide feedback in the same language as the original content.

Based on the above guidelines, provide specific and natural feedback that aligns with your assigned role:`;

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      controller.enqueue(
        encoder.encode(
          `data: ${JSON.stringify({ type: "feedbackStyle", feedbackStyle })}\n\n`,
        ),
      );

      const openaiStream = await openai.chat.completions.create({
        model: "gpt-4o-mini-2024-07-18",
        messages: [{ role: "system", content: message }],
        stream: true,
        max_tokens: 300,
      });

      let fullContent = "";
      for await (const chunk of openaiStream) {
        const content = chunk.choices[0]?.delta?.content || "";
        fullContent += content;
        if (content) {
          controller.enqueue(
            encoder.encode(
              `data: ${JSON.stringify({ type: "content", content })}\n\n`,
            ),
          );
        }
      }

      await supabase.rpc("create_ai_reply", {
        p_post_id: postId,
        p_content: fullContent,
        p_feedback_style: feedbackStyle,
      });

      controller.enqueue(
        encoder.encode(`data: ${JSON.stringify({ type: "done" })}\n\n`),
      );
      controller.close();
    },
  });

  return new NextResponse(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
