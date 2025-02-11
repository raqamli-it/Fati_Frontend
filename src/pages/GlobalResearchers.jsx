import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";
import style from "./GlobalResearchers.module.css";

export const GlobalResearchers = ({ setLoading, loading }) => {
  const { t, i18n } = useTranslation();
  const [data, setData] = useState([]);
  const lang = i18n.language;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        await axios
          .get("/xalqaro-aloqalar/tadqiqot/")
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

  console.log(data, "Nima gap ww");

  return (
    <div className={style.globalResearchers}>
      <div className={style.card}>
        {data?.map((value, index) => (
          <div key={index} className={style.cards}>
            {/* <div className={style.cardLeft}>
              <h1>{value?.[`title_${lang}`]}</h1>
              <img src={value?.img_file} alt={value?.[`title_${lang}`]} />
            </div> */}

            <div
              className={style.cardRight}
              dangerouslySetInnerHTML={{
                __html: value[`content_${lang}`],
              }}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
};
