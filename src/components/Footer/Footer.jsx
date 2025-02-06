import { useTranslation } from "react-i18next";
import styles from "./footer.module.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { FaFacebook, FaInstagram, FaTelegram, FaYoutube } from "react-icons/fa";

export const Footer = () => {
  const { t } = useTranslation();
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        axios
          .get("/qoshimcha-malumotlar/aloqa/")
          .then((req) => setData(req.data.results));
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.column}>
          <div className={styles.row1}>
            <Link to={"/"}>
              <img
                src="/assets/logo-light.jpg"
                alt="logo light"
                className={styles.logo}
              />
            </Link>
          </div>
          <div className={styles.row2}>
            <nav>
              <div>
                <h2>{t("subscribe")}</h2>
                <ul style={{ display: "grid", gap: "15px" }}>
                  <li>
                    <a
                      href={data?.[0]?.telegram}
                      target="_blank"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        cursor: "pointer",
                      }}
                    >
                      <FaTelegram style={{ fontSize: "24px" }} />
                      <span>Telegram</span>
                    </a>
                  </li>

                  <li>
                    <a
                      href={data?.[0]?.facebook}
                      target="_blank"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        cursor: "pointer",
                      }}
                    >
                      <FaFacebook style={{ fontSize: "24px" }} />
                      <span>Facebook</span>
                    </a>
                  </li>

                  <li>
                    <a
                      href={data?.[0]?.instagram}
                      target="_blank"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        cursor: "pointer",
                      }}
                    >
                      <FaInstagram style={{ fontSize: "24px" }} />
                      <span>Instagram</span>
                    </a>
                  </li>

                  <li>
                    <a
                      href={data?.[0]?.youtube}
                      target="_blank"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        cursor: "pointer",
                      }}
                    >
                      <FaYoutube style={{ fontSize: "24px" }} />
                      <span>Youtube</span>
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h2>{t("visit_us")}</h2>
                <ul>
                  <li>Toshkent sh.</li>
                  <li>Mirobod tumani</li>
                  <li>Shahrisabz tor ko`chasi, 5-uy</li>
                </ul>
              </div>
            </nav>
          </div>
        </div>
        <div className={styles.bottom}>
          <p>{t("rights")}</p>
          {/* <p>
            © Copyright {new Date().getFullYear()} - Web developed by #bUrkHaNov
          </p> */}
        </div>
      </div>
    </footer>
  );
};
