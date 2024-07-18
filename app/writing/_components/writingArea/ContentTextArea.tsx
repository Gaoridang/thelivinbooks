import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import React from "react";

const ContentTextArea = () => {
  return (
    <>
      <Label htmlFor="story">이야기</Label>
      <Textarea
        placeholder=""
        className="resize-none rounded-none border-none pl-0 focus-visible:ring-0"
        name="story"
        id="story"
        maxLength={500}
      />
    </>
  );
};

export default ContentTextArea;
