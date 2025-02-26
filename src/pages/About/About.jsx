import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import axios from "axios";
import image from "../../../public/assets/user.jpg";
import style from "./about.module.css";

export const About = ({ loading, setLoading }) => {
  const { t, i18n } = useTranslation();
  const [data, setData] = useState([]);
  const lang = i18n.language;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "/qoshimcha-malumotlar/institut-tarixi/"
        );
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("API fetch error:", error);
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
    <section className={style.about}>
      {data.map((item, index) => (
        <div key={index} className={style.card}>
          <img src={item.image} alt={item.name || "Rasm"} />
          <p className={style.text}>{item?.[`title_${lang}`]}</p>
          <p
            dangerouslySetInnerHTML={{ __html: item?.[`content_${lang}`] }}
          ></p>
          <h1>Direktorlar</h1>
          <div className={style.innerCard}>
            {item?.direktorlar?.map((value, idx) => (
              <div key={idx}>
                <img src={value?.image} alt="" />
                <p>{value?.[`title_${lang}`]}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
};
