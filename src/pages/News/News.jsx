import { useTranslation } from "react-i18next";
import styles from "./news.module.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { LiaArrowRightSolid } from "react-icons/lia";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";

export const month = {
  "01_uz": "Yanvar",
  "02_uz": "Fevral",
  "03_uz": "Mart",
  "04_uz": "Aprel",
  "05_uz": "May",
  "06_uz": "Iyun",
  "07_uz": "Iyul",
  "08_uz": "Avgust",
  "09_uz": "Sentabr",
  "10_uz": "Oktabr",
  "11_uz": "Noyabr",
  "12_uz": "Dekabr",
  "01_en": "January",
  "02_en": "February",
  "03_en": "March",
  "04_en": "Aprel",
  "05_en": "May",
  "06_en": "June",
  "07_en": "July",
  "08_en": "August",
  "09_en": "September",
  "10_en": "October",
  "11_en": "November",
  "12_en": "December",
};

export const News = ({ setLoading, loading }) => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        await axios
          .get("/qoshimcha-malumotlar/yangiliklar/")
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

  console.log(data, "data");
  return (
    <div className={styles.news_container}>
      <h1 style={{ maxWidth: "1320px", margin: "0 auto", marginTop: "20px" }}>
        {t("news")}
      </h1>
      <div className={styles.news}>
        {data?.map((item) => {
          return (
            <div className={styles.card} key={item?.id}>
              <img src={item.image} alt={item[`title_${lang}`]} />

              <div className={styles.content}>
                <h2>{item?.[`title_${lang}`]}</h2>
                <p
                  dangerouslySetInnerHTML={{
                    __html:
                      item?.[`content_${lang}`].length > 200
                        ? item?.[`content_${lang}`].slice(0, 200) + "..."
                        : item?.[`content_${lang}`],
                  }}
                ></p>
                <div className={styles["news-title"]}>
                  <span>
                    {item?.created_at?.slice(8, 10) +
                      " " +
                      month[item?.created_at?.slice(5, 7) + "_" + lang] +
                      " " +
                      item?.created_at?.slice(0, 4)}
                  </span>

                  <Tooltip
                    title={
                      <span
                        style={{
                          fontSize: "14px",
                          lineHeight: "30px",
                        }}
                      >
                        Batafsil ko'rish
                      </span>
                    }
                    placement="top"
                  >
                    <Link to={"/news/" + item?.id}>
                      <LiaArrowRightSolid className={styles.arrow} />
                    </Link>
                  </Tooltip>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
