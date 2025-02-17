import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import seminar from "./seminar.module.css";
import axios from "axios";
export const Seminar = ({ setLoading, loading }) => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const { id } = useParams();

  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        await axios.get(`/seminar/seminar/`).then((req) => setData(req.data));

        setLoading(false);
      } catch (error) {
        setLoading("show-p");
      }
    };
    fetchData();
  }, [setLoading]);
  const FindIdCategory = data.filter((value) => value.id === Number(id));

  if (loading === "show-p") {
    return <p className="show-p-error">{t("show-p-error")}</p>;
  }
  if (loading === true) {
    return <div className="loader"></div>;
  }

  console.log(data, "data seminar");

  return (
    <section className={seminar["seminar-container"]}>
      <h1>{FindIdCategory[0]?.[`title_${lang}`]}</h1>
      <h3
        dangerouslySetInnerHTML={{
          __html: FindIdCategory[0]?.[`content_${lang}`],
        }}
      ></h3>
    </section>
  );
};
