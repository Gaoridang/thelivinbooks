import { createClient } from "@/app/utils/supabase/server";
import { Puzzle } from "lucide-react";
import { PostgrestError } from "@supabase/supabase-js";

interface Props {
  totalAnswers: number;
}

const TotalAnswers = async ({ totalAnswers }: Props) => {
  return (
    <div>
      <div className="mb-4 flex items-center gap-2">
        <Puzzle />
        <p>
          지금까지 <span className="font-bold">{totalAnswers}개</span>의 퍼즐이
          모였습니다.
        </p>
      </div>
    </div>
  );
};

export default TotalAnswers;
