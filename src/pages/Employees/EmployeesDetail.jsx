import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";
import style from "./employees.module.css";
import { FaArrowLeftLong } from "react-icons/fa6";

function EmployeesDetail() {
  const { detail } = useParams();
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const [dataDetail, setDataDetail] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`/markazlar-bolimlar/Xodimlar/${detail}`)
      .then((response) => setDataDetail(response.data)) // ✅ To‘g‘ri versiya
      .catch((error) => console.error("Xatolik:", error));
  }, [detail]);

  console.log(dataDetail, "detail xxx");

  return (
    <div className={style.container}>
      <button
        title="Sahifadan chiqish"
        className={style["back-button"]}
        onClick={() => navigate(-1)}
      >
        <FaArrowLeftLong fontSize={"22px"} />
        Sahifadan chiqish
      </button>

      <div className={style.imgDetail}>
        <img src={dataDetail.image} alt={dataDetail?.[`ful_name_${lang}`]} />
      </div>

      <div className={style.cardDetail}>
        <h1>{dataDetail?.[`full_name_${lang}`]}</h1>
        <div
          dangerouslySetInnerHTML={{ __html: dataDetail?.[`about_${lang}`] }}
        ></div>
      </div>
    </div>
  );
}

export default EmployeesDetail;
