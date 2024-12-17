import { Link } from "react-router-dom";
import styles from "./navbar.module.css";
import { navbarData } from "../../exports/navbar";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { Search } from "../Search/Search";
import { GrDown } from "react-icons/gr";
import { BiMenu } from "react-icons/bi";
import { Time } from "./Time";
import { Wheater } from "./Wheater";
import axios from "axios";

export const Navbar = () => {
  const { i18n, t } = useTranslation();
  const [langVal, setLangValue] = useState("uz");
  const [showLang, setShowLang] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const [centers, setSectersData] = useState([]);
  const [seminar, setSeminarData] = useState([]);

  const lang = i18n.language;

  useEffect(() => {
    i18n.changeLanguage(langVal);
    localStorage.setItem("i18lng", langVal);
  }, [langVal]);

  useEffect(() => {
    const fetchData = () => {
      try {
        axios
          .get("/markazlar-va-bolimlar/markazlar_bolimlar/")
          .then((req) => setSectersData(req.data));
        axios
          .get("/seminar/seminar-turlari/")
          .then((req) => setSeminarData(req.data.results));
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <nav className={styles.navbar}>
      <div className={styles.top_alert}>
        <Time />
        <p className={styles.alert}>{t("test")}</p>
        <Wheater />
      </div>
      <div className="container">
        <div className={styles.container}>
          <div className={styles.top}>
            <Link to={"/"} className={styles.logo}>
              <img src="/assets/logo-light.png" alt="logo" />
            </Link>
            <Search />
            <div className={styles.lang}>
              <div
                className={styles.clc}
                onClick={() => setShowLang((prev) => !prev)}
              >
                <img
                  src={`/assets/${langVal == "en" ? "english" : "uzbek"}.png`}
                  alt="flag"
                />
                <p> {langVal == "en" ? "English" : "O'zbekcha"}</p>
              </div>
              {showLang && (
                <span
                  onClick={() => {
                    setLangValue(langVal != "en" ? "en" : "uz");
                    setShowLang((prev) => !prev);
                  }}
                  className={styles.change}
                >
                  <img
                    src={`/assets/${langVal != "en" ? "english" : "uzbek"}.png`}
                    alt="flag"
                  />
                  <p> {langVal != "en" ? "English" : "O'zbekcha"}</p>
                </span>
              )}
            </div>
          </div>
          <div className={styles["menu-mob"]}>
            <div
              className={styles["mob-icon"]}
              onClick={() => setShowMenu((prev) => !prev)}
            >
              <BiMenu />
            </div>
          </div>
          <ul className={showMenu ? styles.show : ""}>
            {navbarData.map((item) => {
              const { id, content } = item;
              return (
                <li key={id}>
                  <input type="radio" name="menu" id={id} />
                  <label htmlFor={id}>
                    {!item?.links ? (
                      <Link to={item.to}>{t(content)}</Link>
                    ) : (
                      <p>
                        {t(content)} {item?.links && <GrDown />}
                      </p>
                    )}
                    <ol>
                      {item?.links != 1 && item?.links != 2
                        ? item?.links?.map((item) => {
                            const { id, content, to } = item;
                            return (
                              <li key={id} onClick={() => setShowMenu(false)}>
                                <Link to={to}>{t(content)}</Link>
                              </li>
                            );
                          })
                        : item?.links != 1 && item?.links == 2
                        ? seminar?.map((item) => (
                            <li
                              key={item?.id}
                              onClick={() => setShowMenu(false)}
                            >
                              <Link to={`/seminar/${item.id}`}>
                                {item?.[`title_${lang}`]}
                              </Link>
                            </li>
                          ))
                        : centers?.map((item) => (
                            <li
                              key={item?.id}
                              onClick={() => setShowMenu(false)}
                            >
                              <Link to={`/centers-and-departments/${item.id}`}>
                                {item?.[`title_${lang}`]}
                              </Link>
                            </li>
                          ))}
                    </ol>
                  </label>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </nav>
  );
};
