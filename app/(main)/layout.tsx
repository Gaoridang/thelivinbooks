import React, { PropsWithChildren } from "react";
import Header from "../Header";

const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="mx-auto max-w-2xl md:p-4">
      <Header />
      <div>{children}</div>
    </div>
  );
};

export default MainLayout;
