"use client";

import { supabase } from "@/app/utils/supabase/client";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import ExampleResponses from "./ExampleResponses";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabaseService } from "../_utils/supabaseService";
import { createClient } from "@/app/utils/supabase/server";
import { OnboardingComponentProps } from "../_types";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";

interface Question {
  id: string;
  question: string;
}

const ResponseSchema = z.object({
  answers: z.array(
    z.object({
      questionId: z.string(),
      answer: z.string().min(1, "답변을 입력해주세요."),
    }),
  ),
});

type ResponseType = z.infer<typeof ResponseSchema>;

const Questions = ({ user }: OnboardingComponentProps) => {
  const form = useForm<ResponseType>({
    resolver: zodResolver(ResponseSchema),
    defaultValues: {
      answers: [],
    },
  });

  const { fields, append } = useFieldArray({
    control: form.control,
    name: "answers",
  });

  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Question[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/questions", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Fetched questions:", data);
        setQuestions(data.questions);

        data.questions.forEach((question: Question) => {
          append({ questionId: question.id, answer: "" });
        });
      } catch (err) {
        console.error("Error fetching questions:", err);
        setError("Failed to fetch questions. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [append]);

  const handleAnswerChange = (questionId: string, answer: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const onSubmit = async (data: ResponseType) => {
    const parsedAnswers = data.answers.map((answer) => ({
      user_id: user?.id,
      question_id: answer.questionId,
      answer: answer.answer,
    }));

    const upsertedData = await supabaseService.upsert(
      "profile_answers",
      parsedAnswers,
    );

    const { error } = await supabase.from("onboarding_progress").upsert({
      user_id: user?.id!,
      questions_completed: true,
    });

    if (error) {
      console.error("Error updating onboarding process", error);
    } else {
      router.replace("/dashboard");
    }
  };

  if (isLoading || !questions.length) {
    <div>
      <Skeleton className="h-6 w-full" />
      <Skeleton className="h-6 w-full" />
      <Skeleton className="h-6 w-full" />
    </div>;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {error && <p>{error}</p>}
        {fields.map((field, index) => {
          const question = questions.find((q) => q.id === field.questionId);

          return (
            <div key={field.id}>
              <Label>{question?.question}</Label>
              <Input
                {...form.register(`answers.${index}.answer`)}
                placeholder="답변을 입력해주세요."
              />
              {form.formState.errors.answers?.[index]?.answer && (
                <p>{form.formState.errors.answers[index].answer.message}</p>
              )}
            </div>
          );
        })}
        <Button type="submit">제출</Button>
      </form>
    </Form>
  );
};

export default Questions;
