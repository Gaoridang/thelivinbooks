import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import React from "react";

interface Props {
  value: string;
  onChange: (content: string) => void;
}

const ContentTextArea = ({ value, onChange }: Props) => {
  return (
    <div>
      <Label htmlFor="story" className="text-2xl font-bold">
        이야기
      </Label>
      <Textarea
        placeholder="당신의 이야기를 적어주세요."
        className="h-full resize-none rounded-none border-none pl-0 text-base focus-visible:ring-0"
        name="story"
        id="story"
        maxLength={500}
        rows={10}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default ContentTextArea;
