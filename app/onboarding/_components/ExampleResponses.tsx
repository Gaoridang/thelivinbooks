import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React from "react";

interface Props {
  example_responses: string[];
}

const ExampleResponses = ({ example_responses }: Props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link">예시 답변 보기</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>답변 예시</DialogTitle>
          <DialogDescription>
            {example_responses.map((response, index) => (
              <p key={index}>• {response}</p>
            ))}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ExampleResponses;
