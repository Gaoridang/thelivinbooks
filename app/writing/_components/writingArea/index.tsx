"use client";

import { useState } from "react";
import AIrecommendTopic from "./AIrecommendTopic";
import ContentTextArea from "./ContentTextArea";
import TitleInput from "./TitleInput";
import { Button } from "@/components/ui/button";
import { supabaseService } from "@/app/onboarding/_utils/supabaseService";
import { useRouter } from "next/navigation";

const WritingArea = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const router = useRouter();

  const handleSubmit = async () => {
    await supabaseService.insert("posts", {
      title,
      content,
    });
    // router.replace("/dashboard");
  };

  const handleChangeTitle = (value: string) => {
    setTitle(value);
  };

  const handleChangeContent = (value: string) => {
    setContent(value);
  };

  return (
    <div className="grid gap-4">
      <TitleInput value={title} onChange={handleChangeTitle} />
      <AIrecommendTopic />
      <ContentTextArea value={content} onChange={handleChangeContent} />
      <Button onClick={handleSubmit}>발행</Button>
    </div>
  );
};

export default WritingArea;
