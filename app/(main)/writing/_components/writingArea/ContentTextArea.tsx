import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useFormContext } from "react-hook-form";

const ContentTextArea = () => {
  const { control } = useFormContext();

  return (
    <FormField
      name="content"
      control={control}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="border-l-4 border-yellow pl-4 font-semibold">
            이야기
          </FormLabel>
          <FormControl>
            <Textarea
              {...field}
              placeholder="당신의 이야기를 적어주세요."
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
