import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import coookie from "js-cookie"

import GlobalIcon from "./globalIcon";

const languages = [
  {
    code: 'fr',
    name: 'Français',
    country_code: 'fr'
  },
  {
    code: 'en',
    name: 'English',
    country_code: 'gb'
  },
  {
    code: 'tr',
    name: 'తెలుగు',
    country_code: 'in'
  },
  {
    code: 'ar',
    name: 'العربية',
    country_code: 'sa',
    dir: "rtl"
  },
]

function App() {
  const { t } = useTranslation();
  const currentLanguageCode = coookie.get('i18next') || 'en';
  const currentLanguage = languages.find(l => l.code === currentLanguageCode);
  const releaseDate = new Date('2021-12-16');
  const timeDifference = new Date() - releaseDate;
  const number_of_days = Math.floor(timeDifference / (1000 * 60 * 60 * 24))

  useEffect(() => {
    document.body.dir = currentLanguage.dir || 'ltr';
    document.title = t('app_title')
  }, [currentLanguage, t('app_title')])

  return (
    <div className="container">
      <div className="d-flex justify-content-end">
        <div className="dropdown">
          <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
            <GlobalIcon />
          </button>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <li>
              <span className="dropdow-item-text">{t('language')}</span>
            </li>
            {languages.map(({ code, name, country_code }, index) => (
              <li key={index}>
                <button
                  className="dropdown-item"
                  onClick={() => i18next.changeLanguage(code)}
                  disabled={code === currentLanguageCode}>
                  <span
                    className={`flag-icon flag-icon-${country_code} mx-2`}
                    style={{ opacity: code === currentLanguage ? 0.5 : 1 }}></span>
                  {name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="d-flex flex-column align-items-start">
        <h1 className="font-weight-normal mb-3"> {t('welcome_message')} </h1>
        <p>{t('days_since_release', { number_of_days })}</p>
      </div>
    </div >
  );
}

export default App;
