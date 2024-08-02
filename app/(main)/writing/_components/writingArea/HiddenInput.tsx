import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React from "react";
import { useFormContext } from "react-hook-form";

interface Props {
  name: string;
}

const HiddenInput = ({ name }: Props) => {
  const { control } = useFormContext();

  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <Input className="hidden" {...field} />
          </FormControl>
        </FormItem>
      )}
    />
  );
};

export default HiddenInput;
