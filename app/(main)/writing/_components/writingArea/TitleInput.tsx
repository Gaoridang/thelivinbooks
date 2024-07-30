import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React from "react";
import { useFormContext } from "react-hook-form";

const TitleInput = () => {
  const { control } = useFormContext();

  return (
    <FormField
      name="title"
      control={control}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="border-l-4 border-yellow pl-4 font-semibold">
            제목
          </FormLabel>
          <FormControl>
            <Input
              {...field}
              placeholder="제목을 입력하세요."
              className="rounded-none border-none pl-0 text-base focus-visible:ring-0"
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
};

export default TitleInput;
