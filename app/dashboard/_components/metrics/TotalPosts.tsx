import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

interface Props {
  count: number;
}

const TotalPosts = ({ count }: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>전체 글 수</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{count}</p>
      </CardContent>
    </Card>
  );
};

export default TotalPosts;
