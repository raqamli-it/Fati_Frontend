import { Link } from "react-router-dom";
import styles from "./navbar.module.css";
import { navbarData } from "../../exports/navbar";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { Search } from "../Search/Search";
import { GrDown } from "react-icons/gr";
import { AiOutlineClose } from "react-icons/ai";
import { TbMenu2 } from "react-icons/tb";
import { Time } from "./Time";
import { Wheater } from "./Wheater";
import axios from "axios";

export const Navbar = () => {
  const [language, setLanguage] = useState("");

  const [isScrolled, setIsScrolled] = useState(false);
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

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth > 1080) {
        setIsScrolled(window.scrollY >= 90);
        setOpenIconMenu(false);
      } else {
        setIsScrolled(false);
        setOpenIconMenu(true);
      }
    };
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll); // resize bo‘lsa ham tekshir
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const { i18n, t } = useTranslation();
  const lang = i18n.language;
  const [showLang, setShowLang] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [openIconMenu, setOpenIconMenu] = useState(false);
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

  useEffect(() => {
    fetchData();
  }, []);

  const OpenIconMenu = () => {
    setOpenIconMenu(!openIconMenu);
  };

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
          <div className={styles["global-search"]}>
            <input type="text" placeholder="Izlash ... " />
            <button>Qidiruv</button>

            <div className={styles.lang}>
              <div className={styles.change}>
                <select
                  onChange={(e) => setLangValue(e.target.value)}
                  value={langVal}
                >
                  <option value="uz">UZB</option>
                  <option value="en">ENG</option>
                </select>
              </div>
            </div>
          </div>

          <div className={styles.closeIcon}>
            <button onClick={OpenIconMenu}>
              {openIconMenu ? <TbMenu2 /> : <AiOutlineClose />}
            </button>
          </div>
        </div>

        <ul
          style={{
            backgroundColor: isScrolled && "white",
            top: isScrolled && "0px",
            position: isScrolled && "fixed",
            color: isScrolled && "black",
            // marginTop: openIconMenu ? "0" : "-420px",
          }}
          // className={`${styles.show} ${openIconMenu && styles.toggleBox}`}
          // className={openIconMenu ? styles.toggleBox : styles.show}
          className={`${styles.show} ${openIconMenu ? styles.toggleBox : ""}`}
        >
          <div className={styles["global-search-mobile"]}>
            <input type="text" placeholder="Izlash ... " />
            <button>Qidiruv</button>

            <div className={styles.lang}>
              <select
                onChange={(e) => setLangValue(e.target.value)}
                value={langVal}
              >
                <option value="uz">UZB</option>
                <option value="en">ENG</option>
              </select>
            </div>
          </div>

          {navbarData.map((item, index) => {
            const { id, content } = item;
            return (
              <li key={index} className={styles.menuItem}>
                <label htmlFor={id}>
                  <div className={styles.hoverTrigger}>
                    {item?.links ? (
                      <p>{t(content)}</p>
                    ) : (
                      <Link to={item.to}>{t(content)}</Link>
                    )}
                  </div>

                  <ol
                    className={styles.submenu}
                    style={{ backgroundColor: isScrolled ? "white" : "" }}
                  >
                    {item?.links !== 1 && item?.links !== 2 && item?.links !== 3
                      ? item?.links?.map((item, index) => (
                          <li key={index}>
                            <Link to={`${item.to}/${item.id}`}>
                              {t(item.content)}
                            </Link>
                          </li>
                        ))
                      : item?.links === 2
                      ? seminar?.map((item, index) => (
                          <li key={index}>
                            <Link to={`/seminar/${item.id}`}>
                              {item[`title_${lang}`]}
                            </Link>
                          </li>
                        ))
                      : item?.links === 1
                      ? teachers?.map((item, index) => (
                          <li key={index}>
                            <Link
                              to={`/centers-and-departments/bolim/${item.id}`}
                            >
                              {item[`title_${lang}`]}
                            </Link>
                          </li>
                        ))
                      : markazlar?.map((item, index) => (
                          <li key={index}>
                            <Link
                              to={`/centers-and-departments/markaz/${item.id}`}
                            >
                              {item[`title_${lang}`]}
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
