import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import seminar from "./seminar.module.css";
import axios from "axios";
import { FaArrowLeftLong } from "react-icons/fa6";

function SeminarDetail({ setLoading, loading }) {
  const { seminarDetail } = useParams();
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const navigate=useNavigate()

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

  // const FindIdCategory = data.filter((value) => value.id === Number(id));

  if (loading === "show-p") {
    return <p className="show-p-error">{t("show-p-error")}</p>;
  }
  if (loading === true) {
    return <div className="loader"></div>;
  }

  const FindIdCategory = data.find(
    (value) => value.id === Number(seminarDetail)
  );

  console.log(FindIdCategory, "FindIdCategory");

  return (
    <div className={seminar["seminar-container"]}>
      <div className={seminar.prevIcon}>
        <button
          className={seminar["back-button"]}
          title="Saxifadan chiqish"
          onClick={() => navigate(-1)}
        >
          <FaArrowLeftLong
            style={{
              fontSize: "24px",
              color: "blue",
              cursor: "pointer",
            }}
          />
          Saxifadan chiqish
        </button>

        <p>{FindIdCategory?.[`title_${lang}`]}</p>
      </div>
      <img
        className={seminar.detailImg}
        src={FindIdCategory && FindIdCategory.image}
        alt={FindIdCategory?.[`title_${lang}`]}
      />
      <div
        className={seminar.title}
        dangerouslySetInnerHTML={{
          __html: FindIdCategory?.[`content_${lang}`],
        }}
      ></div>
    </div>
  );
}

export default SeminarDetail;
