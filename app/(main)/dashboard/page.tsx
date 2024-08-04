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
  return (
    <div>
      {/* <TotalAnswers totalAnswers={totalAnswers} /> */}

      <AnswersContainer />
    </div>
  );
};

export default DashboardPage;
