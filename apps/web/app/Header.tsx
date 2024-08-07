import Logo from "./(main)/dashboard/_components/Logo";
import GoProfile from "./components/header/GoProfile";
import LogoutButton from "./components/header/logout";

const Header = () => {
  return (
    <div className="p-4">
      <div className="flex items-center justify-between">
        <Logo width={120} />
        <div className="space-x-2">
          <GoProfile />
          <LogoutButton />
        </div>
      </div>
    </div>
  );
};

export default Header;
