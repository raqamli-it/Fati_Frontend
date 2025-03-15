import { useEffect, useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import styles from "./DocAdmission.module.css";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

export const ScYoung = ({ setLoading, loading }) => {
  const [data, setData] = useState([]);
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/kengashlar/yosh-olimlar/");
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Ma'lumotlarni olishda xatolik:", error);
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
                <h2 className={styles["about-title"]}>
                  {item?.[`title_${lang}`]}
                </h2>
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
  );
};
