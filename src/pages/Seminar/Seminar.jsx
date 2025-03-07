import { useTranslation } from "react-i18next";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import seminar from "./seminar.module.css";
import axios from "axios";

export const Seminar = ({ setLoading, loading }) => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

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
  }, []);

  const FindIdCategory = data.filter(
    (value) => value.seminar_id === Number(location.pathname.slice(-1))
  );

  if (loading === "show-p") {
    return <p className="show-p-error">{t("show-p-error")}</p>;
  }

  if (loading === true) {
    return <div className="loader"></div>;
  }

  return (
    <section className={seminar["seminar-container"]}>
      <div className={seminar.wrapper}>
        {FindIdCategory?.map((value, index) => (
          <div key={index} className={seminar.cards}>
            <img src={value?.image} alt={value?.[`title_${lang}`]} />
            <h2 className={seminar.title}>{value?.[`title_${lang}`]}</h2>
            <button
              onClick={() => navigate(`${location.pathname}/${value.id}`)}
              className={seminar.btn}
            >
              Batafsil
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};
