import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import React from "react";

interface Props {
  date: string;
}

const LastPostDate = ({ date }: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>마지막 포스팅</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{date}</p>
      </CardContent>
    </Card>
  );
};

export default LastPostDate;
