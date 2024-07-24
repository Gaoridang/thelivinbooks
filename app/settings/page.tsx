import React from "react";
import { createClient } from "../utils/supabase/server";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { feedbackStyles } from "../data/feedback_styles";
import FeedbackStyleSelection from "./_components/FeedbackStyleSelection";

const SettingsPage = async () => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("*")
    .single();

  console.log(profile);

  return (
    <div className="mx-auto max-w-xl">
      {/* <div>
        <Label>이름</Label>
        <Input />
      </div> */}
      <FeedbackStyleSelection
        initialFeedbackStyle={profile?.feedback_style}
        user={user}
      />
    </div>
  );
};

export default SettingsPage;
