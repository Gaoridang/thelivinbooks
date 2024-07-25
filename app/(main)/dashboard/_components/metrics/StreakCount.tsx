import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

interface Props {
  count: number;
}

const StreakCount = ({ count }: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>연속 일 수</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{count}</p>
      </CardContent>
    </Card>
  );
};

export default StreakCount;
