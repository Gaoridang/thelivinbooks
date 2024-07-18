import { User } from "@supabase/supabase-js";

export interface OnboardingComponentProps {
  user: User | null;
  onComplete: () => void;
}
