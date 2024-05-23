// src/i18n.js
import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";

i18n
  .use(Backend) // Utilise le backend pour charger les traductions
  .use(LanguageDetector) // Détecte la langue de l'utilisateur
  .use(initReactI18next) // Initialise la liaison avec React
  .init({
    supportedLngs: ["en", "fr", "es"], // Langues supportées
    fallbackLng: "en", // Langue par défaut si la langue détectée n'est pas supportée
    detection: {
      order: [
        "querystring",
        "cookie",
        "localStorage",
        "navigator",
        "htmlTag",
        "path",
        "subdomain",
      ],
      caches: ["cookie"],
    },
    backend: {
      loadPath: "/locales/{{lng}}/translation.json", // URL pour charger les fichiers de traduction
      // Pour charger les traductions dynamiques depuis la base de données,
      // configure ton serveur pour répondre à cette URL avec les traductions appropriées.
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;
