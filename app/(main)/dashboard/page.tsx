import { createClient } from "@/app/utils/supabase/server";
import { PostgrestError } from "@supabase/supabase-js";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import TotalAnswers from "./_components/actions";
import AnswersContainer from "./_components/answers/AnswersContainer";
import { fetchAnswers } from "@/app/utils/fetchAnswers";

const DashboardPage = async () => {
  const supabase = createClient();
  const { data, error } = (await supabase.rpc(
    "get_user_dashboard_data",
  )) as unknown as {
    data: {
      answerCount: number;
      questionId: string;
      question: string;
    }[];
    error: PostgrestError | null;
  };

  const totalAnswers = data?.reduce((acc, cur) => {
    return acc + cur.answerCount;
  }, 0);

  // 답변 prefetch
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["answers"],
    queryFn: fetchAnswers,
  });

  return (
    <div>
      <TotalAnswers totalAnswers={totalAnswers} />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <AnswersContainer />
      </HydrationBoundary>
    </div>
  );
};

export default DashboardPage;
