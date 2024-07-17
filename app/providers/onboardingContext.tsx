"use client";

import { createContext, PropsWithChildren, useContext, useState } from "react";

interface Onboarding {
  name: string;
  experience: string;
  feedback_style: string;
}

interface OnboardingContextType {
  onboarding: Onboarding;
  updateOnboarding: (field: keyof Onboarding, value: string) => void;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(
  undefined,
);

export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error("useOnboarding must be used within an OnboardingProvider");
  }
  return context;
};

export const OnboardingProvider = ({ children }: PropsWithChildren) => {
  const [onboarding, setOnboarding] = useState<Onboarding>({
    name: "",
    experience: "",
    feedback_style: "",
  });

  const updateOnboarding = (field: keyof Onboarding, value: string) => {
    setOnboarding((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <OnboardingContext.Provider value={{ onboarding, updateOnboarding }}>
      {children}
    </OnboardingContext.Provider>
  );
};
