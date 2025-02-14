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
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 126) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const { i18n, t } = useTranslation();
  const [langVal, setLangValue] = useState("uz");
  const [showLang, setShowLang] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [teachers, setTeachersData] = useState([]);
  const [seminar, setSeminarData] = useState([]);
  const [markazlar, setMarkazlarData] = useState([]);
  const lang = i18n.language;

  useEffect(() => {
    i18n.changeLanguage(langVal);
    localStorage.setItem("i18lng", langVal);
  }, [langVal]);

  useEffect(() => {
    const fetchData = () => {
      try {
        axios
          .get("/markazlar-bolimlar/bolimlar-list")
          .then((req) => setTeachersData(req.data));
        axios
          .get("/seminar/seminar-turlari/")
          .then((req) => setSeminarData(req.data));
        axios
          .get("/markazlar-bolimlar/markazlar-list")
          .then((req) => setMarkazlarData(req.data));
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  console.log(seminar, "seminar");

  return (
    <nav className={styles.navbar}>
      <div className={styles.top_alert}>
        <Time />
        <p className={styles.alert}>{t("test")}</p>
        {/* <Wheater /> */}
      </div>

      <div className={styles.container}>
        <div className={styles.top}>
          <Link to={"/"} className={styles.logo}>
            <img src="/assets/f-logo.png" alt="logo" />
          </Link>

          {/* <Search /> */}

          <div className={styles.lang}>
            <div
              className={styles.change}
              onClick={() => setShowLang((prev) => !prev)}
            >
              <img
                src={`/assets/${langVal === "en" ? "english" : "uzbek"}.png`}
                alt="flag"
              />
              <p>{langVal === "en" ? "English" : "O'zbekcha"}</p>
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
                <p>{langVal != "en" ? "English" : "O'zbekcha"}</p>
              </span>
            )}
          </div>
        </div>

        <div className={styles["menu-mob"]}>
          <div onClick={() => setShowMenu((prev) => !prev)}>
            <BiMenu />
          </div>
        </div>

        <ul
          style={{
            backgroundColor: isScrolled && "white",
            top: isScrolled && "0px",
            position: isScrolled && "fixed",
            color: isScrolled && "black",
          }}
          className={styles.show}
        >
          {navbarData.map((item, index) => {
            const { id, content } = item;
            return (
              <li key={index}>
                <label htmlFor={id}>
                  {item?.links ? (
                    <p
                      style={{
                        display: "flex",
                        gap: "5px",
                        height: "55px",
                        margin: "0 20px",
                        fontSize: "16px",
                        justifyContent: "center",
                      }}
                    >
                      {t(content)}
                    </p>
                  ) : (
                    <Link
                      style={{
                        overflowY: "hidden",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "55px",
                        width: "90px",
                      }}
                      to={item.to}
                    >
                      {t(content)}
                    </Link>
                  )}
                  <ol>
                    {item?.links !== 1 && item?.links !== 2 && item?.links !== 3
                      ? item?.links?.map((item, index) => {
                          const { id, content, to } = item;
                          return (
                            <li
                              style={{
                                color: isScrolled && "white",
                              }}
                              key={index}
                              onClick={() => setShowMenu(false)}
                            >
                              <Link to={`${to}/${id}`}>{t(content)}</Link>
                            </li>
                          );
                        })
                      : item?.links === 2
                      ? seminar?.map((item, index) => (
                          <li
                            style={{
                              color: isScrolled && "white",
                            }}
                            key={index}
                            onClick={() => setShowMenu(false)}
                          >
                            <Link to={`/seminar/${item.id}`}>
                              {item?.[`title_${lang}`]}
                            </Link>
                          </li>
                        ))
                      : item?.links === 1
                      ? teachers?.map((item, index) => (
                          <li
                            style={{ color: isScrolled && "white" }}
                            key={index}
                            onClick={() => setShowMenu(false)}
                          >
                            <Link
                              to={`/centers-and-departments/bolim/${item.id}`}
                            >
                              {item?.[`title_${lang}`]}
                            </Link>
                          </li>
                        ))
                      : markazlar?.map((item, index) => (
                          <li
                            style={{ color: isScrolled && "white" }}
                            key={index}
                            onClick={() => setShowMenu(false)}
                          >
                            <Link
                              to={`/centers-and-departments/markaz/${item.id}`}
                            >
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
    </nav>
  );
};
