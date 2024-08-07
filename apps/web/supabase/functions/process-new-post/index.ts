// @ts-ignore
// @ts-nocheck

// supabase/functions/process-new-post/index.ts

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// CORS 헤더 설정
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

// 환경 변수 설정
const openAIApiKey = Deno.env.get("OPENAI_API_KEY");
const supabaseUrl = Deno.env.get("SUPABASE_URL");
const supabaseServiceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

// Supabase 클라이언트 생성
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

serve(async (req) => {
  // CORS preflight 요청 처리
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    console.log("Received request:", req.method, req.url);

    // 요청 본문 확인
    const bodyText = await req.text();
    console.log("Request body:", bodyText);

    if (!bodyText) {
      throw new Error("Request body is empty");
    }

    // JSON 파싱
    let body;
    try {
      body = JSON.parse(bodyText);
      console.log("Parsed body:", body);
    } catch (error) {
      console.error("Error parsing JSON:", error);
      throw new Error("Invalid JSON in request body");
    }

    // 필수 필드 검증
    const { postId, title, content, userId } = body;
    if (!postId || !title || !content || !userId) {
      throw new Error("Missing required fields in request body");
    }

    // 사용자의 피드백 스타일 가져오기
    const { data: profileData, error: profileError } = await supabase
      .from("profiles")
      .select("feedback_style")
      .eq("id", userId)
      .single();

    if (profileError) {
      console.error("Error fetching profile:", profileError);
      throw new Error("Failed to fetch user profile");
    }

    const feedbackStyle = profileData.feedback_style;

    // OpenAI API 프롬프트 준비
    const prompt = `
You are an expert providing feedback on a user's text. Give feedback in a specific style based on your assigned role. Follow these instructions:

1. Information provided:
   a) User's text (title and content)
   b) Your assigned role (feedback style)

2. Read the user's text:
<user_text>
Title: ${title}
Content: ${content}
</user_text>

3. Your assigned role (feedback style):
<feedback_style>
${feedbackStyle}
</feedback_style>

4. Provide feedback based on your role's characteristics:

   - '자세한 조언가': Analyze 2-3 key aspects and give specific, concise advice.
   - '칭찬 위주 응원가': Highlight 1-2 strengths and offer brief encouragement.
   - '생각 키우는 질문가': Ask 2-3 thought-provoking questions about the text.
   - '독자 입장 피드백': Give a brief, honest reaction as a general reader.
   - '창의력 자극가': Suggest 1-2 creative ideas to expand on the text.
   - '인터넷 댓글 작성자': Write a short, casual comment as if on social media.
   - '스토리 확장가': Briefly propose a new direction or element for the story.
   - '감정 공감가': Express a short, empathetic response to the text's emotions.

5. Keep your feedback concise, focusing on the most important points.

6. Use language that matches your role's style, but avoid excessive questions or explanations.

7. Consider both the title and content in your feedback, but don't include them in your response.

Provide your role-specific feedback in 3-5 sentences maximum:
    `;

    // OpenAI API 호출
    const openAIResponse = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${openAIApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-4o-2024-05-13",
          messages: [{ role: "user", content: prompt }],
          max_tokens: 150,
        }),
      },
    );

    const openAIData = await openAIResponse.json();

    if (!openAIData.choices || openAIData.choices.length === 0) {
      throw new Error("Failed to generate AI reply");
    }

    const aiReply = openAIData.choices[0].message.content;

    // AI 답변을 ai_replies 테이블에 저장
    const { error: insertError } = await supabase.from("ai_replies").insert({
      post_id: postId,
      content: aiReply,
      feedback_style: feedbackStyle,
    });

    if (insertError) {
      console.error("Error inserting AI reply:", insertError);
      throw new Error("Failed to save AI reply");
    }

    return new Response(
      JSON.stringify({
        message: "AI reply generated and saved successfully",
        reply: aiReply,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      },
    );
  } catch (error) {
    console.error("Error in process-new-post function:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    });
  }
});
