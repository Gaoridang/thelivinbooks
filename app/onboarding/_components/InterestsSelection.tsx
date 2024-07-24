import { interestCategories } from "@/app/data/interestCategories";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { OnboardingComponentProps } from "../_types";
import { supabaseService } from "../_utils/supabaseService";

const InterestSchema = z.object({
  interests: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "관심사를 선택하세요.",
  }),
});

interface Props extends OnboardingComponentProps {
  interests: { id: string; name: string }[];
}

const InterestsSelection = ({ user, onComplete, interests }: Props) => {
  const form = useForm<z.infer<typeof InterestSchema>>({
    resolver: zodResolver(InterestSchema),
    defaultValues: {
      interests: [],
    },
  });

  const onSubmit = async (data: z.infer<typeof InterestSchema>) => {
    const interests = data.interests.map((interest) => ({
      user_id: user?.id,
      interest_id: interest,
    }));

    await supabaseService.upsert("profile_interests", interests);
    await supabaseService.upsert("onboarding_progress", {
      user_id: user?.id!,
      interests_completed: true,
    });
    onComplete && onComplete();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="interests"
          render={({ field }) => (
            <FormItem className="flex flex-wrap gap-2 space-y-0">
              {interests.map((interest) => (
                <FormControl key={interest.id}>
                  <Button
                    type="button"
                    variant={
                      field.value.includes(interest.id) ? "default" : "ghost"
                    }
                    className={`flex items-center gap-2 rounded-full border px-3 py-2 ${
                      field.value.includes(interest.id)
                        ? "bg-primary text-primary-foreground"
                        : ""
                    }`}
                    onClick={() => {
                      const updatedValue = field.value.includes(interest.id)
                        ? field.value.filter((id) => id !== interest.id)
                        : [...field.value, interest.id];
                      field.onChange(updatedValue);
                    }}
                  >
                    {/* <span className="text-lg">{interest.icon}</span> */}
                    <span>{interest.name}</span>
                  </Button>
                </FormControl>
              ))}
            </FormItem>
          )}
        />
        <Button type="submit">다음</Button>
      </form>
    </Form>
  );
};

export default InterestsSelection;
