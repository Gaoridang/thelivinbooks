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

const InterestsSelection = ({ user, onComplete }: OnboardingComponentProps) => {
  const form = useForm<z.infer<typeof InterestSchema>>({
    resolver: zodResolver(InterestSchema),
    defaultValues: {
      interests: [],
    },
  });

  const onSubmit = async (data: z.infer<typeof InterestSchema>) => {
    const interests = data.interests.map((interest) => ({
      profile_id: user?.id,
      interest_name: interest,
    }));

    await supabaseService.upsert("profile_interests", interests);
    onComplete();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="interests"
          render={({ field }) => (
            <FormItem className="flex flex-wrap gap-2 space-y-0">
              {interestCategories.map((category) => (
                <FormControl key={category.id}>
                  <Button
                    type="button"
                    variant={
                      field.value.includes(category.id) ? "default" : "ghost"
                    }
                    className={`flex items-center gap-2 rounded-full border px-3 py-2 ${
                      field.value.includes(category.id)
                        ? "bg-primary text-primary-foreground"
                        : ""
                    }`}
                    onClick={() => {
                      const updatedValue = field.value.includes(category.id)
                        ? field.value.filter((id) => id !== category.id)
                        : [...field.value, category.id];
                      field.onChange(updatedValue);
                    }}
                  >
                    <span className="text-lg">{category.icon}</span>
                    <span>{category.name}</span>
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
