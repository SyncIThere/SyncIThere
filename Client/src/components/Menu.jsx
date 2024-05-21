import { Building2, CircleUser, Compass, Contact } from "lucide-react";

const Menu = () => {
  return (
    <>
      <header>
        <nav className="bg-border fixed bottom-0 w-full h-[70px] flex justify-center md:hidden">
          <ul className="flex justify-around items-center w-full">
            <li>
              <a
                href="/"
                className="flex flex-col justify-center items-center text-text decoration-transparent font-light"
              >
                <Building2 strokeWidth={1} color="#EDEEF0" />
                Servers
              </a>
            </li>
            <li>
              <a
                href="/friends"
                className="flex flex-col justify-center items-center text-text decoration-transparent font-light"
              >
                <Contact strokeWidth={1} color="#EDEEF0" />
                Friends
              </a>
            </li>
            <li>
              <a
                href="/"
                className="flex flex-col justify-center items-center text-text decoration-transparent font-light"
              >
                <Compass strokeWidth={1} color="#EDEEF0" />
                Discover
              </a>
            </li>
            <li>
              <a
                href="/account"
                className="flex flex-col justify-center items-center text-text decoration-transparent font-light"
              >
                <CircleUser strokeWidth={1} color="#EDEEF0" />
                Account
              </a>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Menu;
