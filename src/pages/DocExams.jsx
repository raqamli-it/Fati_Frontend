import { useEffect, useState } from "react";
import PageTop from "../components/PageTop/PageTop";
import axios from "axios";
import { useTranslation } from "react-i18next";
import styles from "./DocAdmission.module.css";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

export const DocExams = ({ setLoading, loading }) => {
  const [data, setData] = useState([]);
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        await axios
          .get("/doktarantura/malakaviy-imtihon/")
          .then((req) => setData(req.data));
        setLoading(false);
      } catch (error) {
        setLoading("show-p");
      }
    };
    fetchData();
  }, []);

  if (loading === "show-p") {
    return <p className="show-p-error">{t("show-p-error")}</p>;
  }

  if (loading === true) {
    return <div className="loader"></div>;
  }

  return (
    <section className={styles["container"]}>
      <div className={styles["about-container"]}>
        {data.map((item) => {
          return (
            <div className={styles.items} key={item.id}>
              <div>
                <div className={styles.prevIcon}>
                  <button
                    className={styles["back-button"]}
                    title="Saxifadan chiqish"
                    onClick={() => navigate("/")}
                  >
                    <FaArrowLeftLong
                      style={{
                        fontSize: "24px",
                        color: "blue",
                        cursor: "pointer",
                      }}
                    />
                    Saxifadan chiqish
                  </button>

                  <h2>{item?.[`title_${lang}`]}</h2>
                </div>
                <img
                  className={styles["images"]}
                  src={item?.file}
                  alt={item?.[`title_${lang}`]}
                />
              </div>

              <div
                className={styles["about-text"]}
                dangerouslySetInnerHTML={{
                  __html: item?.[`content_${lang}`],
                }}
              ></div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
