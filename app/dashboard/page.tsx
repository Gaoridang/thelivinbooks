import { redirect } from "next/navigation";
import { createClient } from "../utils/supabase/server";
import Actions from "./_components/actions";
import Metrics from "./_components/metrics";
import MostRecentWriting from "./_components/mostRecentWriting";
import Posts from "./_components/posts";

const DashboardPage = async () => {
  return (
    <div className="mx-auto mt-6 grid max-w-2xl gap-6">
      <Actions />
      <Metrics />
      <Posts />
      {/* <MostRecentWriting /> */}
    </div>
  );
};

export default DashboardPage;
