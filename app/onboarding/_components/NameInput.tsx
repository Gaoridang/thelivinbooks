import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { OnboardingComponentProps } from "../_types";
import { supabaseService } from "../_utils/supabaseService";

const NameInput = ({ user, onComplete }: OnboardingComponentProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ name: string }>({
    defaultValues: { name: "" },
  });

  const onSubmit = async (data: { name: string }) => {
    await supabaseService.upsert("profiles", {
      id: user?.id!,
      name: data.name,
    });
    await supabaseService.upsert("onboarding_progress", {
      user_id: user?.id!,
      profile_completed: true,
    });
    onComplete && onComplete();
  };

  return (
    <div>
      <h2>환영합니다!</h2>
      <p>당신만을 위한 글쓰기 여정을 시작해보세요.</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          {...register("name", { required: "이름을 입력하세요." })}
          placeholder="이름을 입력해주세요."
          autoComplete="off"
        />
        {errors.name && <p>{errors.name.message}</p>}
        <Button type="submit">다음</Button>
      </form>
    </div>
  );
};

export default NameInput;
