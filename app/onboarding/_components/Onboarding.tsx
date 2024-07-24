"use client";

import { User } from "@supabase/supabase-js";
import { useState } from "react";
import ExperienceSelection from "./ExperienceSelection";
import FeedbackStyleSelection from "./FeedbackStyleSelection";
import InterestsSelection from "./InterestsSelection";
import NameInput from "./NameInput";
import { supabase } from "@/app/utils/supabase/client";
import Questions from "./Questions";

interface Props {
  user: User | null;
  progress: {
    profile_completed: boolean;
    interests_completed: boolean;
    questions_completed: boolean;
  };
  interests: { id: string; name: string }[];
}

const Onboarding = ({ user, progress, interests }: Props) => {
  const initialStep = () => {
    if (!progress.profile_completed) {
      return 1;
    } else if (!progress.interests_completed) {
      return 2;
    } else if (!progress.questions_completed) {
      return 3;
    } else {
      return 4;
    }
  };

  const [step, setStep] = useState(initialStep);

  const handleNext = () => {
    setStep((prev) => prev + 1);
  };

  const renderItem = () => {
    switch (step) {
      case 1:
        return <NameInput user={user} onComplete={handleNext} />;
      case 2:
        return (
          <InterestsSelection
            user={user}
            interests={interests}
            onComplete={handleNext}
          />
        );
      case 3:
        return <Questions user={user} />;
      default:
        return null;
    }
  };

  return <div className="grid place-content-center">{renderItem()}</div>;
};

export default Onboarding;
