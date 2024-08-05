import { createClient } from "@/app/utils/supabase/server";
import { PencilLine } from "lucide-react";
import Link from "next/link";

const RecommendedQuestion = async () => {
  const supabase = createClient();
  const { data, error } = await supabase.rpc("get_random_question").single();

  if (error) {
    console.error(error);
  }

  return (
    <div className="group relative flex items-center justify-between gap-4 rounded-lg border px-4 py-5 pb-4">
      <div className="absolute left-4 top-0 -translate-y-1/2 rounded-full bg-slate-100 px-2 py-1 text-sm font-semibold">
        오늘의 질문
      </div>
      <p>{data?.content}</p>
      <Link
        href={`/writing/${data?.id}`}
        className="flex items-center justify-center rounded-md bg-yellow p-2 opacity-70 transition-opacity hover:opacity-100"
      >
        <PencilLine />
      </Link>
    </div>
  );
};

export default RecommendedQuestion;
