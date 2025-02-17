import { useTranslation } from "react-i18next";
import { Mail, Phone } from "lucide-react";
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

  console.log(data, "ScientificDegree");

  return (
    <section className={styles.container}>
      {data.map((item, index) => (
        <div key={index} className={styles["person-card"]}>
          <div className={styles["card-content"]}>
            <h2 className={styles.name}>{item?.[`name_${lang}`]}</h2>
            <p className={styles.position}>{item?.[`position_${lang}`]}</p>
            <p className={styles.degree}>{item?.[`degree_${lang}`]}</p>
            <div className={styles["contact-info"]}>
              <Phone className={styles.icon} />
              <span>{item.contact}</span>
            </div>
            <div className={styles["contact-info"]}>
              <Mail className={styles.icon} />
              <span>{item.email}</span>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};
