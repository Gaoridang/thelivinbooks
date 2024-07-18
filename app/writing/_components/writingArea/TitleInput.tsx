import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";

interface Props {
  value: string;
  onChange: (title: string) => void;
}

const TitleInput = ({ value, onChange }: Props) => {
  return (
    <div>
      <Label htmlFor="title" className="text-2xl font-bold">
        제목
      </Label>
      <Input
        placeholder="제목을 입력하세요."
        name="title"
        id="title"
        className="rounded-none border-none pl-0 text-base focus-visible:ring-0"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default TitleInput;
