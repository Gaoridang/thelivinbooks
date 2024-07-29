import { fetchAnswers } from "@/app/utils/getCategorizedAnswers";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import Actions from "./_components/actions";
import AnswersContainer from "./_components/answers/AnswersContainer";

const DashboardPage = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["answers"],
    queryFn: fetchAnswers,
    retry: 1,
  });

  return (
    <div className="mx-auto mt-6 grid max-w-2xl gap-6 p-6 md:p-0">
      <Actions />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <AnswersContainer />
      </HydrationBoundary>
    </div>
  );
};

export default DashboardPage;
