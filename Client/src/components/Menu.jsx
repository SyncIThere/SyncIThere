import { Building2, CircleUser, Compass, Contact } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import "../i18n";

const Menu = () => {
  const { t } = useTranslation();
  return (
    <>
      <header>
        <nav className="bg-border fixed bottom-0 w-full h-[70px] flex justify-center md:hidden">
          <ul className="flex justify-around items-center w-full">
            <li>
              <Link
                to="/"
                className="flex flex-col justify-center items-center text-text decoration-transparent font-light"
              >
                <Building2 strokeWidth={1} color="#EDEEF0" />
                {t("Servers")}
              </Link>
            </li>
            <li>
              <Link
                to="/friends"
                className="flex flex-col justify-center items-center text-text decoration-transparent font-light"
              >
                <Contact strokeWidth={1} color="#EDEEF0" />
                {t("Friends")}
              </Link>
            </li>
            <li>
              <Link
                to="/discover"
                className="flex flex-col justify-center items-center text-text decoration-transparent font-light"
              >
                <Compass strokeWidth={1} color="#EDEEF0" />
                {t("Discover")}
              </Link>
            </li>
            <li>
              <Link
                to="/account"
                className="flex flex-col justify-center items-center text-text decoration-transparent font-light"
              >
                <CircleUser strokeWidth={1} color="#EDEEF0" />
                {t("Account")}
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Menu;
