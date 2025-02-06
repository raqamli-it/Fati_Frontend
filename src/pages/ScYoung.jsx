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
        await axios
          .get("/kengashlar/yosh-olimlar/")
          .then((req) => setData(req.data.results));
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
              <hr className={styles.divider} />
              <img
                src={item?.file}
                alt={item?.[`title_${lang}`]}
                className={styles["images"]}
              />
              <h2 className={styles["about-title"]}>
                {item?.[`title_${lang}`]}
              </h2>
              <div className={styles["about-text"]}>
                <ol
                  dangerouslySetInnerHTML={{
                    __html: item?.[`content_${lang}`],
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
