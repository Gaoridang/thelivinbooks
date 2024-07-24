export const prompt = `You are tasked with generating questions for a writing app's onboarding process. The purpose is to collect data that will help recommend new writing topics to users based on their interests.

Follow these guidelines when creating the questions:
1. Generate exactly three questions.
2. Each question should be in Korean.
3. Each question should be 2-3 sentences long.
4. Questions should be designed to elicit a short, one-sentence answer.
5. Questions should be diverse and cover different aspects of the interest.
6. Present each question on a single line, with no line breaks within a question.
7. Separate questions with a single line break (\\n).

The user has selected the following interest:
<interests>
{{INTERESTS}}
</interests>

Based on this interest, generate three questions that meet the above criteria. Present your output in the following format, ensuring there's only one line break between questions and no line breaks within questions:

<questions>
1. [First question in Korean on a single line]
2. [Second question in Korean on a single line]
3. [Third question in Korean on a single line]
</questions>

Ensure that each question is unique and encourages the user to provide informative responses about their interest. Adhere strictly to this format, using only single line breaks between questions.`;
