import { Button } from "@/components/ui/button";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import React from "react";

const ThumbsButtons = () => {
  return (
    <div className="flex items-center gap-2">
      <Button className="h-8 w-8 p-2">
        <ThumbsUp color="white" className="rounded-sm text-gray-900" />
      </Button>
      <Button
        variant="secondary"
        className="h-8 w-8 border border-gray-400 p-2"
      >
        <ThumbsDown className="rounded-sm text-gray-900" />
      </Button>
    </div>
  );
};

export default ThumbsButtons;
