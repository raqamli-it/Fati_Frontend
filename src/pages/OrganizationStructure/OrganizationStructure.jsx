import { useEffect, useState } from "react";
import axios from "axios";
import style from "./OrganizationStructure.module.css";
import { useTranslation } from "react-i18next";

export const OrganizationStructure = ({ setLoading, loading }) => {
  const [data, setData] = useState([]);
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        await axios
          .get("/qoshimcha-malumotlar/tashkiliy-tuzulma/")
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

  console.log((data, "ddd"));

  return (
    <section className={style.organizationStructure}>
      <div className={style.card}>
        {data?.map((value, index) => (
          <div key={index}>
            <img src={value.file} alt={value?.[`title_${lang}`]} />
          </div>
        ))}
      </div>
    </section>
  );
};
