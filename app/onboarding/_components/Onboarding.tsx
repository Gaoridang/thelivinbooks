"use client";

import { User } from "@supabase/supabase-js";
import { useState } from "react";
import ExperienceSelection from "./ExperienceSelection";
import FeedbackStyleSelection from "./FeedbackStyleSelection";
import InterestsSelection from "./InterestsSelection";
import NameInput from "./NameInput";

interface Props {
  user: User | null;
}

const Onboarding = ({ user }: Props) => {
  const [step, setStep] = useState(1);

  const handleNext = () => {
    setStep((prev) => prev + 1);
  };

  const renderItem = () => {
    switch (step) {
      case 1:
        return <NameInput user={user} onComplete={handleNext} />;
      case 2:
        return <ExperienceSelection user={user} onComplete={handleNext} />;
      case 3:
        return <InterestsSelection user={user} onComplete={handleNext} />;
      case 4:
        return <FeedbackStyleSelection user={user} onComplete={handleNext} />;
      default:
        return null;
    }
  };

  return <div className="grid place-content-center">{renderItem()}</div>;
};

export default Onboarding;
