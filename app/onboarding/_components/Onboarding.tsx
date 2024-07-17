"use client";

import React, { useState } from "react";
import NameInput from "./NameInput";
import ExperienceSelection from "./ExperienceSelection";
import FeedbackStyleSelection from "./FeedbackStyleSelection";
import { Button } from "@/components/ui/button";
import { useOnboarding } from "@/app/providers/onboardingContext";
import { supabase } from "@/app/utils/supabase/client";
import { feedbackStyles } from "@/app/data/feedback_styles";
import { User } from "@supabase/supabase-js";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

interface Props {
  user: User | null;
}

const Onboarding = ({ user }: Props) => {
  const { onboarding } = useOnboarding();
  const [step, setStep] = useState(1);
  const [isLoading, setLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const handleNext = () => {
    setStep((prev) => prev + 1);
  };

  const handlePrev = () => {
    setStep((prev) => prev - 1);
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.from("profiles").upsert({
        id: user?.id,
        name: onboarding.name,
        experience: onboarding.experience,
        feedback_style: feedbackStyles.find(
          (feedback) => feedback.key === onboarding.feedback_style,
        )?.description,
      });

      if (error) {
        toast({
          title: "오류",
          description:
            "프로필 업데이트 중 문제가 발생했습니다. 다시 시도해 주세요.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "성공",
          description: "프로필이 성공적으로 업데이트되었습니다.",
        });

        router.replace("/dashboard");
      }
    } catch (error) {
      toast({
        title: "오류",
        description:
          "프로필 업데이트 중 문제가 발생했습니다. 다시 시도해 주세요.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const isLastStep = step === 3;
  const isFirstStep = step === 1;

  return (
    <div className="grid place-content-center">
      {step === 1 && <NameInput />}
      {step === 2 && <ExperienceSelection />}
      {step === 3 && <FeedbackStyleSelection />}
      <div>
        {!isFirstStep && (
          <Button variant="outline" onClick={handlePrev}>
            이전
          </Button>
        )}
        {!isLastStep && <Button onClick={handleNext}>다음</Button>}
        {isLastStep && (
          <Button onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? "업데이트 중.." : "완료"}
          </Button>
        )}
      </div>
    </div>
  );
};

export default Onboarding;
