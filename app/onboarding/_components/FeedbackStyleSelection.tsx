import React from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { feedbackStyles } from "@/app/data/feedback_styles";
import { useOnboarding } from "@/app/providers/onboardingContext";

const FeedbackStyleSelection = () => {
  const { onboarding, updateOnboarding } = useOnboarding();

  return (
    <RadioGroup
      value={onboarding.feedback_style}
      onValueChange={(value) => updateOnboarding("feedback_style", value)}
    >
      {feedbackStyles.map((style) => (
        <div key={style.key} className="flex items-center space-x-2">
          <RadioGroupItem value={style.key} id={style.key} />
          <Label htmlFor={style.key} className="grid w-full gap-2 border p-4">
            <p className="text-xl font-bold">{style.key}</p>
            <p className="text-gray-600">{style.description}</p>
          </Label>
        </div>
      ))}
    </RadioGroup>
  );
};

export default FeedbackStyleSelection;
