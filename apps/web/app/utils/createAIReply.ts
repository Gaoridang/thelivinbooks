import OpenAI from 'openai';
import { prompt } from '../actions/prompt';
import { createClient } from './supabase/server';

const openAi = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function createAIReply(answerId: string, content: string) {
  try {
    const response = await openAi.chat.completions.create({
      model: 'gpt-4o-mini-2024-07-18',
      messages: [
        {
          role: 'system',
          content: prompt.replace('{{USER_POST}}', content),
        },
      ],
    });

    const message = response.choices[0].message.content;

    const supabase = createClient();
    const { error: POST_REPLY_ERROR } = await supabase.from('ai_replies').insert({
      with_question_answer_id: answerId,
      content: message || '',
    });

    if (POST_REPLY_ERROR) {
      return {
        status: 'INSERT_ERROR',
        error: POST_REPLY_ERROR,
        message: 'AI 답변을 생성하는 중에 오류가 발생했습니다.',
      };
    }

    return {
      status: 'SUCCESS',
      data: { content: message || '' },
    };
  } catch (error) {
    return {
      status: 'INTERNAL_ERROR',
      error: error,
    };
  }
}
