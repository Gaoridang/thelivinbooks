import { redirect } from "next/navigation";
import { createClient } from "../utils/supabase/server";
import Onboarding from "./_components/Onboarding";

const OnboardingPage = async () => {
  const supabase = createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    redirect("login");
  }

  return <Onboarding user={user} />;
};

export default OnboardingPage;
