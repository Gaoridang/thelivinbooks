import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { feedbackStyles } from "@/app/data/feedback_styles";
import { OnboardingComponentProps } from "../_types";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabaseService } from "../_utils/supabaseService";
import { useRouter } from "next/navigation";

const FeedbackSchema = z.object({
  feedback_style: z.string().min(1, "피드백 스타일을 선택하세요."),
});

const FeedbackStyleSelection = ({ user }: OnboardingComponentProps) => {
  const form = useForm({
    resolver: zodResolver(FeedbackSchema),
    defaultValues: {
      feedback_style: "",
    },
  });
  const router = useRouter();

  const onSubmit = async (data: z.infer<typeof FeedbackSchema>) => {
    await supabaseService.upsert("profiles", {
      id: user?.id!,
      feedback_style: data.feedback_style,
    });
    router.replace("/dashboard");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="feedback_style"
          render={({ field }) => {
            return (
              <FormItem>
                <FormControl>
                  <RadioGroup
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                  >
                    {feedbackStyles.map((style) => (
                      <FormItem key={style.key}>
                        <FormControl>
                          <RadioGroupItem value={style.key} />
                        </FormControl>
                        <FormLabel>{style.key}</FormLabel>
                      </FormItem>
                    ))}
                  </RadioGroup>
                </FormControl>
              </FormItem>
            );
          }}
        />
        <Button type="submit">완료</Button>
      </form>
    </Form>
  );
};

export default FeedbackStyleSelection;
