"use client";

import { feedbackStyles } from "@/app/data/feedback_styles";
import { supabaseService } from "@/app/onboarding/_utils/supabaseService";
import { supabase } from "@/app/utils/supabase/client";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { User } from "@supabase/supabase-js";
import React, { useState } from "react";

interface Props {
  initialFeedbackStyle: string;
  user: User | null;
}

const FeedbackStyleSelection = ({ initialFeedbackStyle, user }: Props) => {
  const [feedbackStyle, setFeedbackStyle] = useState(initialFeedbackStyle);

  const handleStyleChange = async (value: string) => {
    setFeedbackStyle(value);
    await supabaseService.upsert("profiles", {
      id: user?.id,
      feedback_style: value,
    });
  };

  return (
    <div>
      <Label>피드백 스타일</Label>
      <Select value={feedbackStyle} onValueChange={handleStyleChange}>
        <SelectTrigger>
          <SelectValue placeholder="피드백 스타일 선택" />
        </SelectTrigger>
        <SelectContent>
          {feedbackStyles.map((style) => (
            <SelectItem value={style.key} key={style.key}>
              {style.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default FeedbackStyleSelection;
