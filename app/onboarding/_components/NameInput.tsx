import { useOnboarding } from "@/app/providers/onboardingContext";
import { Input } from "@/components/ui/input";

const NameInput = () => {
  const { onboarding, updateOnboarding } = useOnboarding();

  return (
    <div>
      <h2>환영합니다!</h2>
      <p>당신만을 위한 글쓰기 여정을 시작해보세요.</p>
      <Input
        placeholder="이름을 입력해주세요."
        onChange={(e) => updateOnboarding("name", e.target.value)}
        value={onboarding.name}
      />
    </div>
  );
};

export default NameInput;
