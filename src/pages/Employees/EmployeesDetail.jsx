import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";
import style from "./Employees.module.css";

function EmployeesDetail() {
  const { detail } = useParams();
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const [dataDetail, setDataDetail] = useState([]);

  useEffect(() => {
    axios
      .get(`/markazlar-bolimlar/Xodimlar/${detail}`)
      .then((response) => setDataDetail(response.data)) // ✅ To‘g‘ri versiya
      .catch((error) => console.error("Xatolik:", error));
  }, [detail]);

  console.log(dataDetail, "detail xxx");

  return (
    <div className={style.container}>
      <div className={style.imgDetail}>
        <img src={dataDetail.image} alt={dataDetail?.[`ful_name_${lang}`]} />
      </div>
      <div className={style.cardDetail}>
        <h1>{dataDetail?.[`ful_name_${lang}`]}</h1>
        <div
          dangerouslySetInnerHTML={{ __html: dataDetail?.[`about_${lang}`] }}
        ></div>
      </div>
    </div>
  );
}

export default EmployeesDetail;
