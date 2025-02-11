import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import style from "./InternationalTravels.module.css";
import axios from "axios";

export const InternationalTravels = ({ loading, setLoading }) => {
  const [data, setData] = useState([]);
  const { t, i18n } = useTranslation();

  const lang = i18n.language;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        await axios
          .get("/xalqaro-aloqalar/xalqaro-sayohatlar/")
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
    <div className={style.internationalTravels}>
      {data?.map((item, index) => (
        <div className={style.card} key={index}>
          <div className={style["card-container"]}>
            <h2>{item?.[`title_${lang}`]}</h2>
            <img src={item?.file} alt="" />
          </div>

          <div className={style["card-content"]}>
            <p
              dangerouslySetInnerHTML={{ __html: item?.[`content_${lang}`] }}
            />
            <p
              dangerouslySetInnerHTML={{ __html: item?.[`subcontent_${lang}`] }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};
