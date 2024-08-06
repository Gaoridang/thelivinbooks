import { PropsWithChildren } from "react";
import Header from "../Header";
import Logo from "./dashboard/_components/Logo";

const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <div>
      <Header />
      <div className="mx-auto max-w-2xl md:p-4">{children}</div>
    </div>
  );
};

export default MainLayout;
