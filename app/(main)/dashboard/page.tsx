import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
  useQuery,
} from "@tanstack/react-query";
import Actions from "./_components/actions";
import Answers from "./_components/answers/Answers";
import { fetchAnswers } from "@/app/utils/getCategorizedAnswers";

const DashboardPage = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["answers"],
    queryFn: fetchAnswers,
  });

  return (
    <div className="mx-auto mt-6 grid max-w-2xl gap-6 p-6 md:p-0">
      <Actions />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Answers />
      </HydrationBoundary>
    </div>
  );
};

export default DashboardPage;
