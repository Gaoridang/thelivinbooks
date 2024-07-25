import React, { PropsWithChildren } from "react";
import Header from "../Header";

const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <div>
      <Header />
      <div>{children}</div>
    </div>
  );
};

export default MainLayout;
