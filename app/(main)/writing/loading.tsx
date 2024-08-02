import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const WritingLoadingPage = () => {
  return (
    <div>
      <Skeleton className="mb-4 h-12 w-80" />
      <div className="space-y-4 rounded-lg border p-4 shadow-md">
        <Skeleton className="h-6 w-40" />
        <Skeleton className="h-[300px] w-full" />
      </div>
    </div>
  );
};

export default WritingLoadingPage;
