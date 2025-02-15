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
      <div>
        <h2>Fanlar akademiyasi Tarix Instituti</h2>
        <div
          style={{
            display: "flex",
            gap: "15px",
            justifyContent: "center",
            margin: "15px 0",
          }}
        >
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
            <FaTelegram style={{ fontSize: "20px" }} />
            <span>Telegram</span>
          </a>

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
            <FaFacebook style={{ fontSize: "20px" }} />
            <span>Facebook</span>
          </a>

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
            <FaInstagram style={{ fontSize: "20px" }} />
            <span>Instagram</span>
          </a>

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
            <FaYoutube style={{ fontSize: "20px" }} />
            <span>Youtube</span>
          </a>
        </div>
      </div>

      <div className={styles.bottom}>
        <p>© Copyright {t("rights")}</p>
        {/* <p>
            © Copyright {new Date().getFullYear()} - Web developed by #bUrkHaNov
          </p> */}
      </div>
    </footer>
  );
};
