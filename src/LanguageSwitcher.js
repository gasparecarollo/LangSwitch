import React from "react";
import { useTranslation } from "react-i18next";

const LanguageSwitcher = () => {
    const { i18n } = useTranslation();

    const handleLanguageChange = (e) => {
        const newLang = e.target.value;
        i18n.changeLanguage(newLang);
    };

    return (
        <select value={i18n.language} onChange={handleLanguageChange}>
            <option value="en"> English </option>
            <option value="fr"> Français </option>
            <option value="es"> Español </option>
            <option value="ita"> Italiano </option>
        </select>
    );
};

export default LanguageSwitcher;