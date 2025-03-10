import { useEffect, useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import styles from "./DocAdmission.module.css";

export const ScYoung = ({ setLoading, loading }) => {
  const [data, setData] = useState([]);
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

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
              <h2 className={styles["about-title"]}>
                {item?.[`title_${lang}`]}
              </h2>
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
