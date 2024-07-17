import React, { PropsWithChildren } from "react";
import { OnboardingProvider } from "../providers/onboardingContext";

const OnboardingLayout = ({ children }: PropsWithChildren) => {
  return <OnboardingProvider>{children}</OnboardingProvider>;
};

export default OnboardingLayout;
