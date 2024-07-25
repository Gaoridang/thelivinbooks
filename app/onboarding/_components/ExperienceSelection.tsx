import { experienceLevels } from "@/app/data/experience_levels";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { OnboardingComponentProps } from "../_types";
import { supabaseService } from "../_utils/supabaseService";

const ExperienceSchema = z.object({
  experience: z.string().min(1, "경험을 선택하세요."),
});

const ExperienceSelection = ({
  user,
  onComplete,
}: OnboardingComponentProps) => {
  const form = useForm({
    resolver: zodResolver(ExperienceSchema),
    defaultValues: {
      experience: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof ExperienceSchema>) => {
    await supabaseService.upsert("profiles", {
      id: user?.id!,
      experience: data.experience,
    });
    onComplete && onComplete();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="experience"
          render={({ field }) => (
            <FormItem>
              <FormLabel></FormLabel>
              <FormControl>
                <RadioGroup
                  defaultValue={field.value}
                  onValueChange={field.onChange}
                >
                  {experienceLevels.map((exp) => (
                    <FormItem key={exp.key}>
                      <FormControl>
                        <RadioGroupItem value={exp.key} />
                      </FormControl>
                      <FormLabel>
                        <p className="text-xl font-bold">{exp.key}</p>
                        <p className="text-gray-600">{exp.description}</p>
                      </FormLabel>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit">다음</Button>
      </form>
    </Form>
  );
};

export default ExperienceSelection;
