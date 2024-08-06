import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@gaoridang/ui/components/ui/form";
import { Textarea } from "@gaoridang/ui/components/ui/textarea";
import { useFormContext } from "react-hook-form";

const ContentTextArea = () => {
  const { control } = useFormContext();

  return (
    <FormField
      name="content"
      control={control}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <Textarea
              {...field}
              placeholder="이야기를 적어주세요."
              maxLength={500}
              rows={8}
              className="resize-none rounded-none border-none pl-0 text-base focus-visible:ring-0"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default ContentTextArea;
