"use client";

import { createAnswer, CreateAnswerType } from "@/app/actions/postAnswer";
import { useFormAction } from "@/app/hooks/useFormAction";
import { CategoryType } from "@/app/types";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useFormState, useFormStatus } from "react-dom";
import ContentTextArea from "./ContentTextArea";
import HiddenInput from "./HiddenInput";
import TitleInput from "./TitleInput";

interface Props {
  fetchedQuestionId?: string;
  category?: CategoryType;
}

const WritingArea = ({ fetchedQuestionId, category }: Props) => {
  const [createAnswerState, createAnswerAction] = useFormState(
    createAnswer,
    null,
  );
  const { pending } = useFormStatus();
  const form = useFormAction<CreateAnswerType>({
    state: createAnswerState,
    defaultValues: {
      title: "",
      content: "",
      questionId: fetchedQuestionId,
      category: category,
    },
  });

  return (
    <Form {...form}>
      <form
        action={createAnswerAction}
        className="grid gap-4 rounded-lg border p-4 shadow-md"
      >
        <TitleInput />
        <ContentTextArea />

        <HiddenInput name="questionId" />
        <HiddenInput name="category" />
        <div>
          <Button
            className="bg-yellow text-black hover:bg-yellow-200"
            disabled={pending}
          >
            {pending ? "답변 전송 중..." : "발행"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default WritingArea;
