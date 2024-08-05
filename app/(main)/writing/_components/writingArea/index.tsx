"use client";

import { createAnswer, CreateAnswerType } from "@/app/actions/createAnswer";
import { useFormAction } from "@/app/hooks/useFormAction";
import { CategoryType } from "@/app/types";
import { Form } from "@/components/ui/form";
import { useFormState } from "react-dom";
import FormFields from "./FormFields";
import CAlertDialog from "../AlertDialog";

interface Props {
  fetchedQuestionId?: string;
  category?: CategoryType;
}

const WritingArea = ({ fetchedQuestionId, category }: Props) => {
  const [createAnswerState, createAnswerAction] = useFormState(
    createAnswer,
    null,
  );

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
        {createAnswerState?.status === "POSTGREST_ERROR" && <CAlertDialog />}
        <FormFields />
      </form>
    </Form>
  );
};

export default WritingArea;
