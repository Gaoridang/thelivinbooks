import { createClient } from "@/app/utils/supabase/server";
import React from "react";
import StreakCount from "./StreakCount";
import TotalPosts from "./TotalPosts";
import LastPostDate from "./LastPostDate";

const Metrics = async () => {
  // 연속 일 수, 총 글 수,
  // 평균 글 수, 평균 글 당 단어 수,
  const supabase = createClient();
  const { data, error } = await supabase
    .from("user_stats")
    .select("streak_count, total_posts, last_post_date")
    .single();

  if (error) {
    return <div>에러 발생</div>;
  }

  return (
    <div className="grid grid-cols-3 gap-4">
      <StreakCount count={data.streak_count} />
      <TotalPosts count={data.total_posts} />
      <LastPostDate date={data.last_post_date} />
    </div>
  );
};

export default Metrics;
