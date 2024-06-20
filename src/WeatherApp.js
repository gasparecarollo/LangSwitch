import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next'
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationEN from "./locales/en/translation.json";
import translationFR from "./locales/fr/translation.json";
import translationES from "./locales/es/translation.json";
import translationITA from "./locales/ita/translation.json";
import LanguageSwitcher from './LanguageSwitcher';
const resources = {
    en: {
        translation: translationEN,
    },
    fr: {
        translation: translationFR,
    },
    es: {
        translation: translationES,
    },
    ita: {
        translation: translationITA,
    },
};

i18n.use(initReactI18next).init({
    resources,
    lng: "en",
    fallbackLng: "en",
    interpolation: {
        escapeValue: false,
    },
});

const WeatherApp = () => {
    const { t } = useTranslation();
    const [city, setCity] = useState("");
    const [weatherData, SetWeatherData] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getWeatherData = async () => {
            setLoading(true);
            try {
                const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=9ba6ce0196b42b189d5a8a33aaa888f9&units=imperial`);

                if (res.status === 200) {
                    SetWeatherData(res.data);
                    setError(null);
                } else {
                    setError("City not found. Please enter a valid city name.")
                }

            } catch (error) {
                setError("Failed to fetch weather data. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        if (city.trim() !== "") {

            getWeatherData();
        }
    }, [city]);


    const handleCityChange = async (e) => {
        const newCity = e.target.value;
        setCity(newCity);
    };
    console.log(weatherData)

    return (
        <div>
            <LanguageSwitcher />
            <input
                type="text"
                value={city}
                onChange={handleCityChange}
                placeholder={t("Enter_City_Name")} />

            {loading ? (
                <p>{t("loading")}...</p>
            ) : error ? (
                <p> {error}</p>
            ) : (

                <>
                    <h2> {t("weather_forecast_for")} : {weatherData.name}</h2>
                    <p> {t("current_temperature")} : {weatherData.main?.temp}  °F </p>
                    <p> {t("feels_like")} : {weatherData.main?.feels_like} °F</p>
                    <p>{t("humidity")} : {weatherData.main?.humidity}</p>
                </>
            )}
        </div>

    );
};

export default WeatherApp;
