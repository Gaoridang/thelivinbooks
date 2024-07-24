import { createClient } from "@/app/utils/supabase/server";
import React, { Suspense } from "react";
import Essay from "./_components/Essay";
import AIReply from "./_components/AIReply";
import { Skeleton } from "@/components/ui/skeleton";

interface Props {
  params: { id: string };
}

const PostDetailPage = async ({ params }: Props) => {
  const supabase = createClient();
  const { data: post, error } = await supabase
    .from("posts")
    .select("*")
    .eq("id", params.id)
    .single();

  return (
    <div>
      <div className="mx-auto max-w-xl bg-white">
        <Essay title={post.title} content={post.content} />
        <AIReply postId={post.id} />
      </div>
    </div>
  );
};

export default PostDetailPage;
