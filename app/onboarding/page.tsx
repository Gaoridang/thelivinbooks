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

  const { data: progress, error: progressError } = await supabase
    .from("onboarding_progress")
    .select("profile_completed, interests_completed, questions_completed")
    .single();
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("onboarding_completed")
    .single();
  const { data: interests, error: interestsError } = await supabase
    .from("interests")
    .select("id, name");

  if (
    progressError ||
    !progress ||
    interestsError ||
    !interests ||
    profileError ||
    !profile
  ) {
    redirect("error");
  }

  if (profile.onboarding_completed) {
    redirect("/dashboard");
  }

  return <Onboarding user={user} progress={progress} interests={interests} />;
};

export default OnboardingPage;
