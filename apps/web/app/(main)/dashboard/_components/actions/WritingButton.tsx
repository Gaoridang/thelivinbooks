"use client";

import { Button } from "@gaoridang/ui/components/ui/button";
import React from "react";
import { useRouter } from "next/navigation";

interface Props {
  questionId: string;
}

const WritingButton = ({ questionId }: Props) => {
  const router = useRouter();

  return (
    <div>
      <Button onClick={() => router.push(`/writing/${questionId}`)}>
        퍼즐 맞추기
      </Button>
    </div>
  );
};

export default WritingButton;
