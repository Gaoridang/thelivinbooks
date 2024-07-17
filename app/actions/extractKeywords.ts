"use server";

import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const systemPrompt = `You are tasked with analyzing an essay and extracting the three most important keywords along with the main topic. Follow these steps carefully:

1. First, read and analyze the following essay thoroughly:

<essay>
{{ESSAY}}
</essay>

2. Conduct a comprehensive analysis of the essay, paying close attention to:
   - The main topic or thesis
   - Recurring themes or ideas
   - Significant concepts or arguments presented
   - Any unique or standout terminology used

3. As you analyze, identify key themes and concepts that are central to the essay's message or argument. Consider:
   - Words or phrases that appear frequently
   - Terms that are crucial to understanding the essay's main points
   - Concepts that the author emphasizes or elaborates on

4. From your analysis, select the three most important keywords that best represent the core ideas of the essay. These should be:
   - Essential to understanding the essay's main message
   - Representative of the essay's key themes or arguments
   - Impactful in conveying the essay's significance

5. Identify the main topic of the essay. This should be:
   - A concise representation of the essay's central theme or argument
   - Encompassing the overall message or purpose of the essay

6. Present your analysis results in the following JSON format:
   {
     "keywords": ["keyword1", "keyword2", "keyword3"],
     "mainTopic": "Main topic"
   }

Provide your final output as a JSON object containing exactly three Korean keywords in an array and one Korean main topic. Do not include any explanation or additional text outside of these tags.

{
  "keywords": ["keyword1", "keyword2", "keyword3"],
  "mainTopic": "Main topic"
}
`;

export async function extractKeywords(formData: FormData) {
  const article = formData.get("article") as string;

  if (!article) {
    throw new Error("User text is required");
  }

  try {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: systemPrompt.replace("{{ESSAY}}", article),
        },
      ],
      model: "gpt-3.5-turbo-0125",
    });

    const response = completion.choices[0]?.message?.content;

    if (!response) {
      throw new Error("No recommendation received from OpenAI");
    }

    const parsed = JSON.parse(response);

    console.log(parsed);
    return parsed;
  } catch (error) {
    console.error("Error in recommend server action:", error);
    throw new Error("Failed to get recommendations");
  }
}
