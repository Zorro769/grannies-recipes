// i18n.js
import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: 'en',
        resources: {
            en: {
                translation: {
                    greeting1: "Welcome to Granny'sRecipes, your passport to culinary adventures!",
                    greeting2: "Discover a treasure trove of delectable recipes from around the globe.",
                },
            },
            uk: {
                translation: {
                    greeting1: "Ласкаво просимо до 'Бабусиних рецептів' - вашого паспорта кулінарних пригод!",
                    greeting2: "Відкрийте для себе скарбницю смачних рецептів з усього світу.",
                },
            },
        },
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;
