import { createClient } from "@/app/utils/supabase/server";
import WritingButton from "./WritingButton";
import Box from "@/app/images/box.svg";
import { Puzzle } from "lucide-react";

const Actions = async () => {
  const supabase = createClient();
  const { data, error } = await supabase.rpc("get_dashboard_info");

  const totalAnswers = data[0].total_answers;
  const nextQuestion = data[0].next_question_content as string;
  const nextQuestionId = data[0].next_question_id;

  return (
    <div>
      <div className="mb-4 flex items-center gap-2">
        <Puzzle />
        <p>
          지금까지 <span className="font-bold">{totalAnswers}개</span>의 퍼즐이
          모였습니다.
        </p>
      </div>
      <div className="bg-yellow flex items-center justify-between gap-4 rounded-2xl px-6 py-4">
        <p>{nextQuestion}</p>
        <WritingButton questionId={nextQuestionId} />
      </div>
    </div>
  );
};

export default Actions;
