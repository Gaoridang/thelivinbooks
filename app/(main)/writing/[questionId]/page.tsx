import { redirect } from "next/navigation";
import { createClient } from "../../../utils/supabase/server";
import Question from "../_components/Question";
import WritingArea from "../_components/writingArea";

interface Props {
  params: { questionId: string };
}

const WritingPage = async ({ params }: Props) => {
  const supabase = createClient();

  const { data: question, error: questionError } = await supabase
    .from("questions")
    .select("content, category")
    .eq("id", params.questionId)
    .single();

  if (questionError) {
    redirect("/error");
  }

  return (
    <div className="relative mx-4 mt-8 max-w-2xl md:mx-auto">
      <Question question={question} />
      <WritingArea fetchedQuestionId={params.questionId} />
    </div>
  );
};

export default WritingPage;
