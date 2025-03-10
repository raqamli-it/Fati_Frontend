import { useEffect, useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import styles from "./DocAdmission.module.css";

export const ScCouncil = ({ setLoading, loading }) => {
  const [data, setData] = useState([]);
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        await axios
          .get("/kengashlar/ilmiy_kengash_majlis/")
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

  console.log(data, "ScCouncil aa");

  return (
    <section className={styles["container"]}>
      <div className={styles["about-container"]}>
        {data.map((item) => {
          return (
            <div className={styles.items} key={item.id}>
              <h2 className={styles["about-title"]}>
                {item?.[`title_${lang}`]}
              </h2>
              <div
                className={styles["about-text"]}
                dangerouslySetInnerHTML={{
                  __html: item?.[`content_${lang}`],
                }}
              ></div>

              <div className={styles.employees}>
                {item?.xodimlar?.map((value, idx) => (
                  <div key={idx}>
                    <div className={styles.employeesImg}>
                      <img src={value.image} alt={item?.[`title_${lang}`]} />
                    </div>

                    <h2 className={styles.employeesName}>
                      {value?.[`full_name_${lang}`]}
                    </h2>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
