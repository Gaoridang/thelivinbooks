import React from "react";
import WritingArea from "./_components/writingArea";
import { createClient } from "../utils/supabase/server";

const WritingPage = async () => {
  const supabase = createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  return (
    <div className="p-4">
      <WritingArea user={user} />
    </div>
  );
};

export default WritingPage;
