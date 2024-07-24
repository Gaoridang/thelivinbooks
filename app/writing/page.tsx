import React, { Suspense } from "react";
import WritingArea from "./_components/writingArea";
import { createClient } from "../utils/supabase/server";
import AIrecommendTopic from "./_components/writingArea/AIrecommendTopic";
import { Skeleton } from "@/components/ui/skeleton";

const WritingPage = async () => {
  const supabase = createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  return (
    <div className="relative mx-auto mt-8 max-w-xl">
      <Suspense
        fallback={
          <div className="mb-4 space-y-2 rounded-lg border p-4">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
          </div>
        }
      >
        <AIrecommendTopic user={user} />
      </Suspense>
      <WritingArea user={user} />
    </div>
  );
};

export default WritingPage;
