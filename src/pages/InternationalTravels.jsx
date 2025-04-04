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

  console.log(data, "data");

  return (
    <div className={style.internationalTravels}>
      {data
        ?.sort((a, b) => b.order - a.order)
        .map((item, index) => (
          <div key={index}>
            <h2>{item?.[`title_${lang}`]}</h2>
            <div className={style.card}>
              <div className={style["card-container"]}>
                <img src={item?.file} alt="" />
              </div>

              <div className={style["card-content"]}>
                <p
                  dangerouslySetInnerHTML={{
                    __html: item?.[`content_${lang}`],
                  }}
                />
                <p
                  dangerouslySetInnerHTML={{
                    __html: item?.[`subcontent_${lang}`],
                  }}
                ></p>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};
