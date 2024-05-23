import { useRecoilValue } from "recoil";
import Logo from "../assets/images/logo.svg";
// import Button from "../components/Button";
import Button from "@mui/material/Button";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import authScreenAtom from "../atoms/authAtom";
import "../i18n";

const Home = () => {
  const { t } = useTranslation();
  const authSreenState = useRecoilValue(authScreenAtom);
  // useSetRecoilState(authScreenAtom, "login");
  console.log(authSreenState);

  return (
    <>
      <main className="flex flex-col items-center justify-center h-[100vh]">
        <div className=" bg-interactiveOpacity shadow-lg mx-3 py-5 h-[90vh] w-full md:w-[400px] md:h-[50vh] border border-border rounded-lg flex flex-col justify-center">
          <div className="flex flex-col justify-center items-center">
            <img className="w-[100px] mb-[25px]" src={Logo} alt="logo" />
            <h1 className="text-3xl mb-[25px]">{t("Connection")}</h1>

            <div className="h-[280px] flex flex-col items-center justify-between">
              <div className="flex flex-col justify-center">
                <label htmlFor="">{t("Email")}</label>
                <input type="mail" placeholder={t("Email")} />
              </div>

              <div className="flex flex-col justify-center">
                <label htmlFor="">{t("Password")}</label>
                <input type="password" placeholder={t("Password")} />
              </div>

              <Link to={"/friends"}>
                <Button
                  variant="contained"
                  color="primary"
                  className="text-text w-[150px]"
                >
                  {t("Connect")}
                </Button>
              </Link>

              <div className="flex">
                <p>{t("Do not have an account yet ? ")}</p>
                <Link to="/inscription">{t("Register now")}</Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
