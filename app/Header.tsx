import { UserPen } from "lucide-react";
import Link from "next/link";
import React from "react";
import LogoutButton from "./login/logout";

const Header = () => {
  return (
    <div className="bg-gray-100 p-4">
      <div className="mx-auto flex max-w-xl items-center justify-between">
        <Link href="/dashboard">ingspire</Link>
        <Link
          href="/settings"
          className="rounded-lg bg-gray-800 p-1 opacity-100 hover:opacity-80"
        >
          <UserPen className="h-6 w-6" color="white" />
        </Link>
        <LogoutButton />
      </div>
    </div>
  );
};

export default Header;
