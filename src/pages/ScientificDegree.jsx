import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import styles from "./PersonCard.module.css";
import axios from "axios";

export const ScientificDegree = ({ setLoading, loading }) => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        await axios.get("/kengashlar/azolar/").then((req) => setData(req.data));
        setLoading(false);
      } catch {
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

  console.log(data, "sipasiba");

  return (
    <section className={styles.container}>
      {data.map((item, index) => (
        <div key={index} className={styles.description}>
          <p>{item?.[`title_${lang}`]}</p>
          <div
            dangerouslySetInnerHTML={{ __html: item?.[`content_${lang}`] }}
          ></div>

          <div className={styles.employees}>
            {item?.kadirlar?.map((value, idx) => (
              <div key={idx} className={styles.employeesCard}>
                <div className={styles.employeesImg}>
                  <img src={value.image} alt={value?.[`full_name_${lang}`]} />
                </div>

                <div className={styles.employeesDescription}>
                  <h2 className={styles.employeesName}>
                    <span>Ish joyi : </span>
                    <span>{value?.[`workplace_${lang}`]}</span>
                  </h2>

                  <h2 className={styles.employeesName}>
                    <span>Ilmiy darajasi : </span>
                    <span>{value?.[`degree_${lang}`]}</span>
                  </h2>

                  <h2 className={styles.employeesName}>
                    <span>Ilmiy unvoni : </span>
                    <span>{value?.[`academic_title_${lang}`]}</span>
                  </h2>

                  <h2 className={styles.employeesName}>
                    <span>Lavozimi : </span>
                    <span>{value?.[`position_${lang}`]}</span>
                  </h2>

                  <h2 className={styles.employeesName}>
                    <span>I.SH.F : </span>
                    <span>{value?.[`full_name_${lang}`]}</span>
                  </h2>

                  <h2 className={styles.employeesName}>
                    <span>Shifri : </span>
                    <span>{value?.shifri}</span>
                  </h2>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
};
