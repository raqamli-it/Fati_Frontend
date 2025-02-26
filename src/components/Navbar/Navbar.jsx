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

  const [language, setLanguage] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 90) {
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
  const lang = i18n.language;
  const [showLang, setShowLang] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [teachers, setTeachersData] = useState([]);
  const [markazlar, setMarkazlarData] = useState([]);
  const [seminar, setSeminarData] = useState([]);

  useEffect(() => {
    const savedLang = localStorage.getItem("i18lng") || "uz";
    setLangValue(savedLang);
    i18n.changeLanguage(savedLang);
  }, []);

  const [langVal, setLangValue] = useState(
    localStorage.getItem("i18lng") || "uz"
  );

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
          .get("/markazlar-bolimlar/markazlar-list")
          .then((req) => setMarkazlarData(req.data));

        axios
          .get("/seminar/seminar-turlari/")
          .then((req) => setSeminarData(req.data));
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <nav className={styles.navbar}>
      {/* <div className={styles.top_alert}>
        <Time />
        <p className={styles.alert}>{t("test")}</p>
        <Wheater />
      </div> */}

      <div className={styles.container}>
        <div className={styles.top}>
          <Link to={"/"} className={styles.logo}>
            <img src="/assets/f-logo.png" alt="logo" />
          </Link>

          {/* <Search /> */}

          <div className={styles.lang}>
            <div className={styles.change}>
              <select
                onChange={(e) => setLangValue(e.target.value)}
                value={langVal}
              >
                <option value="uz">UZB</option>
                <option value="en">ENG</option>
              </select>

              {/* <div
                onClick={() => setLangValue("uz")}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  cursor: "pointer",
                }}
              >
                <img src={uzbek} alt="flag" />
                <p>UZB</p>
              </div>

              <div
                onClick={() => setLangValue("en")}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  cursor: "pointer",
                }}
              >
                <img src={english} alt="flag" />
                <p>ENG</p>
              </div> */}
            </div>
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
                        fontWeight: "400",
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
                        fontWeight: "400",
                        fontSize: "16px",
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
