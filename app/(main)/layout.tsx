import { PropsWithChildren } from "react";
import Header from "../Header";
import Logo from "./dashboard/_components/Logo";

const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <div>
      <Header />
      <Logo />
      <div className="from-yellow-gradient to-orange-gradient mb-4 h-12 w-full bg-gradient-to-r opacity-30"></div>
      <div className="mx-auto max-w-2xl md:p-4">{children}</div>
    </div>
  );
};

export default MainLayout;
