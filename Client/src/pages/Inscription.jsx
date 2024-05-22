import Button from "@mui/material/Button";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Logo from "../assets/images/logo.svg";
import "../i18n";

const Inscription = () => {
  const { t } = useTranslation();
  return (
    <>
      <main className="flex flex-col items-center justify-center h-[100vh]">
        <div className=" bg-interactiveOpacity shadow-lg mx-3 py-5 h-[95vh] w-full md:w-[500px] md:h-[70vh] border border-border rounded-lg flex flex-col justify-center">
          <div className="flex flex-col justify-center items-center">
            <img className="w-[100px] mb-[20px]" src={Logo} alt="logo" />
            <h1 className="text-3xl mb-[20px]">{t("Inscription")}</h1>

            <div className="h-[400px] flex flex-col items-center justify-between">
              <div className="flex flex-col justify-center">
                <label htmlFor="">{t("Pseudo")}</label>
                <input type="text" placeholder={t("Pseudo")} />
              </div>
              <div className="flex flex-col justify-center">
                <label htmlFor="">{t("Email")}</label>
                <input type="mail" placeholder={t("Email")} />
              </div>

              <div className="flex flex-col justify-center">
                <label htmlFor="">{t("Password")}</label>
                <input type="password" placeholder={t("Password")} />
              </div>

              <div className="flex flex-col justify-center">
                <label htmlFor="">{t("Confirm Password")}</label>
                <input type="password" placeholder={t("Confirm Password")} />
              </div>

              <Link to={"/friends"}>
                <Button
                  variant="contained"
                  color="primary"
                  className="text-text w-[150px]"
                >
                  {t("Inscription")}
                </Button>
              </Link>

              <div className="flex">
                <p>{t("Already have an account ?")}</p>
                <Link to="/">{t("Log in")}</Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Inscription;
