import { createClient } from "@/app/utils/supabase/server";
import { redirect } from "next/navigation";
import AIReply from "./AIReply";
import { createAIReply } from "@/app/utils/createAIReply";

interface Props {
  params: { id: string };
}

const AnswerPage = async ({ params }: Props) => {
  const supabase = createClient();

  const { data: answer, error: ANSWER_ERROR } = await supabase
    .from("user_answers_with_question")
    .select()
    .eq("id", params.id)
    .single();

  const { data: reply, error: REPLY_ERROR } = await supabase
    .from("ai_replies")
    .select("content")
    .eq("with_question_answer_id", params.id)
    .maybeSingle();

  if (!reply) {
    createAIReply(
      params.id,
      `- title: ${answer?.title}
       - content: ${answer?.content}` || "나를 위한 질문 몇 가지를 해줘",
    );
  }

  if (ANSWER_ERROR || REPLY_ERROR) {
    redirect("/error");
  }

  const replyContent = reply?.content.replace(/\<\/?comment\>/g, "");

  return (
    <div>
      <p>{answer?.title}</p>
      <p>{answer?.content}</p>
      <AIReply reply={replyContent} />
    </div>
  );
};

export default AnswerPage;
