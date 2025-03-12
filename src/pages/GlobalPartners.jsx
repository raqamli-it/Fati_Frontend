import { useEffect, useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import styles from "./GlobalPartners.module.css";

export const GlobalPartners = ({ setLoading, loading }) => {
  const [data, setData] = useState([]);
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        await axios
          .get("/xalqaro-aloqalar/xamkor-tashkilot/")
          .then((req) => setData(req.data));
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
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

  console.log(data, "salom data");

  return (
    <div className={styles.globalPartners}>
      {data?.map((item, index) => {
        return (
          <div key={index}>
            <h2>{item?.[`title_${lang}`]}</h2>

            <div
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
