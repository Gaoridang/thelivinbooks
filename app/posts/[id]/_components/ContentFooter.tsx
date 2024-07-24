import { Button } from "@/components/ui/button";
import { Angry, Annoyed, Frown, Laugh, Smile } from "lucide-react";
import React from "react";

const imojis = [
  { key: "laugh", icon: <Laugh /> },
  { key: "smile", icon: <Smile /> },
  { key: "annoyed", icon: <Annoyed /> },
  { key: "frown", icon: <Frown /> },
  { key: "angry", icon: <Angry /> },
];

const ContentFooter = () => {
  return (
    <div className="flex items-center justify-end gap-2">
      {imojis.map(({ key, icon }) => (
        <Button
          variant="secondary"
          key={key}
          className="h-8 w-8 rounded-sm bg-gray-50 p-1 opacity-50 hover:opacity-100"
        >
          {icon}
        </Button>
      ))}
    </div>
  );
};

export default ContentFooter;
