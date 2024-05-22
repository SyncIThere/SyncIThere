// src/LanguageSelector.js
import { useTranslation } from "react-i18next";

const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    console.log(i18n.language);
  };

  return (
    <div>
      {i18n.language === "en" ? (
        <button className="m-2" onClick={() => changeLanguage("fr")}>
          FR
        </button>
      ) : (
        <button className="m-2" onClick={() => changeLanguage("en")}>
          En
        </button>
      )}
    </div>
  );
};

export default LanguageSelector;
