import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { KeyboardEvent } from "react";
import { useFormContext } from "react-hook-form";

const TitleInput = () => {
  const { control } = useFormContext();

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  return (
    <FormField
      name="title"
      control={control}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <Input
              {...field}
              autoFocus
              placeholder="제목을 입력하세요."
              className="rounded-none border-none pl-0 text-2xl font-bold focus-visible:ring-0"
              onKeyDown={handleKeyDown}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default TitleInput;
