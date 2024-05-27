import React from "react";
import Logo from "../assets/images/logo.svg";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import authScreenAtom from "../atoms/authAtom";
import { useRecoilValue } from "recoil";

const Home = () => {
  const { t } = useTranslation();
  const authScreenState = useRecoilValue(authScreenAtom);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <img className="w-32 mb-4" src={Logo} alt="logo" />
      <h1 className="text-3xl mb-4">{t("Welcome to SyncIThere")}</h1>
      <p className="text-lg mb-8">{t("This is a project presentation page.")}</p>
      <Link to="/auth">
        <Button variant="contained" color="primary">
          {t("Get Started")}
        </Button>
      </Link>
    </div>
  );
};

export default Home;
