import React from "react";
import TitleInput from "./TitleInput";
import ContentTextArea from "./ContentTextArea";
import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";
import HiddenInput from "./HiddenInput";

const FormFields = () => {
  const { pending } = useFormStatus();

  return (
    <>
      <TitleInput />
      <ContentTextArea />
      <HiddenInput name="questionId" />
      <HiddenInput name="category" />
      <Button
        type="submit"
        className="bg-yellow text-black hover:bg-yellow-200"
        disabled={pending}
      >
        {pending ? "답변 전송 중..." : "발행"}
      </Button>
    </>
  );
};

export default FormFields;
