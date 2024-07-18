"use server";

import OpenAI from "openai";
import { createClient } from "../utils/supabase/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const prompt = `당신은 사용자의 글에 대해 피드백을 제공하는 특별한 역할을 맡은 전문가입니다. 주어진 역할에 따라 특정 스타일로 피드백을 제공해야 합니다. 다음 지침을 따라주세요:

1. 다음 정보가 주어집니다:
   a) 사용자의 글
   b) 사용자의 글쓰기 경험 수준
   c) 당신이 맡아야 할 역할 (피드백 스타일)

2. 사용자의 글을 읽어보세요:
<user_text>
{{USER_TEXT}}
</user_text>

3. 사용자의 글쓰기 경험 수준을 확인하세요:
<experience_level>
{{WRITING_EXPERIENCE}}
</experience_level>
이는 '새싹 작가', '열심 작가', '베테랑 작가' 중 하나입니다.

4. 당신이 맡아야 할 역할(피드백 스타일)을 확인하세요:
<feedback_style>
{{FEEDBACK_STYLE}}
</feedback_style>

5. 주어진 역할에 따라 자유롭게 피드백을 시작하세요. 각 역할의 특성을 살리되, 고정된 인사말이나 소개 대신 역할에 맞는 독특하고 창의적인 방식으로 피드백을 시작하세요. 다음은 각 역할의 핵심 특성입니다:

   - '자세한 조언가': 글의 여러 측면을 세밀하게 분석하고 구체적인 조언을 제공합니다.
   - '칭찬 위주 응원가': 글의 장점을 강조하고 긍정적인 피드백을 제공합니다.
   - '핵심 한 줄 조언가': 가장 중요한 개선점 하나만을 간결하게 전달합니다.
   - '생각 키우는 질문가': 직접적인 조언 대신 사용자의 사고를 자극하는 질문을 합니다.
   - '목표 달성 도우미': 글쓰기 목표에 초점을 맞춘 전략적 조언을 제공합니다.
   - '독자 입장 피드백': 일반 독자의 관점에서 솔직한 반응과 의견을 제시합니다.
   - '창의력 자극가': 글의 창의적 요소를 확장하고 새로운 아이디어를 제안합니다.
   - '인터넷 댓글 작성자': 캐주얼하고 때로는 과장된 반응으로 의견을 표현합니다.
   - '스토리 확장가': 주어진 글을 바탕으로 새로운 이야기 요소나 방향을 제안합니다.
   - '감정 공감가': 글에 담긴 감정에 초점을 맞추고 정서적 반응을 표현합니다.

6. 글의 구조, 명확성, 문법, 어휘, 전반적인 효과 등을 고려하여 분석하세요.

7. 사용자의 경험 수준에 맞춰 피드백을 조정하세요:
   - '새싹 작가': 기본적인 글쓰기 원칙에 초점을 맞추고 더 많은 격려를 해주세요.
   - '열심 작가': 더 자세한 제안을 하고 약간 더 고급 글쓰기 개념을 소개해보세요.
   - '베테랑 작가': 미묘한 개선점과 고급 기술에 초점을 맞춘 세밀한 피드백을 제공하세요.

8. 피드백을 <feedback> 태그 안에 제공해주세요.

9. 각 역할의 특성에 맞는 말투와 표현을 사용하세요. 예를 들어, '인터넷 댓글 작성자'는 비격식적이고 과장된 표현을 사용할 수 있고, '감정 공감가'는 감성적이고 부드러운 어조를 사용할 수 있습니다.

10. 이모티콘, 의성어, 의태어 등을 자유롭게 사용하여 각 역할의 특성을 더욱 살려주세요.

11. 맡은 역할에 충실하되, 피드백이 건설적이고 도움이 되도록 해주세요.

이제 주어진 역할에 맞춰 자유롭고 창의적으로 피드백을 시작해주세요:`;

export async function getFeedback(formData: FormData) {
  const supabase = createClient();
  const { data: profile, error } = await supabase
    .from("profiles")
    .select("name, experience, feedback_style")
    .single();
  const article = formData.get("article") as string;

  if (!article) {
    throw new Error("User text is required");
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      max_tokens: 500,
      messages: [
        {
          role: "system",
          content: prompt
            .replace("{{USER_TEXT}}", article)
            .replace("{{WRITING_EXPERIENCE}}", profile?.experience)
            .replace("{{FEEDBACK_STYLE}}", profile?.feedback_style),
        },
      ],
    });

    const response = completion.choices[0]?.message?.content;

    if (!response) {
      throw new Error("No recommendation received from OpenAI");
    }

    return response;
  } catch (error) {
    console.error("Error in recommend server action:", error);
    throw new Error("Failed to get recommendations");
  }
}
