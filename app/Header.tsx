import { UserPen } from "lucide-react";
import Link from "next/link";
import React from "react";
import LogoutButton from "./components/header/logout";
import GoProfile from "./components/header/GoProfile";

const Header = () => {
  return (
    <div className="py-4">
      <div className="mx-auto flex max-w-2xl items-center justify-between">
        <Link href="/dashboard">livinbooks</Link>
        <div className="space-x-2">
          <GoProfile />
          <LogoutButton />
        </div>
      </div>
    </div>
  );
};

export default Header;
