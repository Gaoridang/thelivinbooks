import { experienceLevels } from "@/app/data/experience_levels";
import { useOnboarding } from "@/app/providers/onboardingContext";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import React from "react";

const ExperienceSelection = () => {
  const { onboarding, updateOnboarding } = useOnboarding();

  return (
    <RadioGroup
      value={onboarding.experience}
      onValueChange={(value) => updateOnboarding("experience", value)}
    >
      {experienceLevels.map((exp) => (
        <div key={exp.key} className="flex items-center space-x-2">
          <RadioGroupItem value={exp.key} id={exp.key} />
          <Label htmlFor={exp.key} className="grid w-full gap-2 border p-4">
            <p className="text-xl font-bold">{exp.key}</p>
            <p className="text-gray-600">{exp.description}</p>
          </Label>
        </div>
      ))}
    </RadioGroup>
  );
};

export default ExperienceSelection;
