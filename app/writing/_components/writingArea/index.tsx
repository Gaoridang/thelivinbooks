"use client";

import TitleInput from "./TitleInput";
import ContentTextArea from "./ContentTextArea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PostSchema } from "@/app/schemas/postSchema";

const WritingArea = () => {
  const { control } = useForm({
    resolver: zodResolver(PostSchema),
  });

  return (
    <>
      <TitleInput />
      <ContentTextArea />
    </>
  );
};

export default WritingArea;
