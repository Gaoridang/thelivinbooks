import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";

const TitleInput = () => {
  return (
    <>
      <Label htmlFor="title" className="text-xl font-bold">
        제목
      </Label>
      <Input
        placeholder="제목을 입력하세요."
        name="title"
        id="title"
        className="rounded-none border-none pl-0 focus-visible:ring-0"
      />
    </>
  );
};

export default TitleInput;
