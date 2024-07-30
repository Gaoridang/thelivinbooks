"use client";

import { createAnswer, CreateAnswerType } from "@/app/actions/postAnswer";
import { useFormAction } from "@/app/hooks/useFormAction";
import { Category } from "@/app/types";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useFormState, useFormStatus } from "react-dom";
import ContentTextArea from "./ContentTextArea";
import TitleInput from "./TitleInput";

interface Props {
  fetchedQuestionId?: string;
  category?: Category;
}

const WritingArea = ({ fetchedQuestionId, category }: Props) => {
  const [createAnswerState] = useFormState(createAnswer, null);
  const { pending } = useFormStatus();
  const form = useFormAction<CreateAnswerType>({
    state: createAnswerState,
    defaultValues: {
      title: "",
      content: "",
    },
  });

  const createAnswerWithQuestionId = createAnswer.bind(null, {
    fetchedQuestionId,
    category,
  });

  return (
    <Form {...form}>
      <form action={createAnswerWithQuestionId} className="grid gap-4">
        <TitleInput />
        <ContentTextArea />
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
