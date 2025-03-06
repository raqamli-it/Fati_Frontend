import React, { useEffect, useState } from "react";
import style from "./Doctaurants.module.css";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import axios from "axios";

function DoctaurantsDetail() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const { id } = useParams();
  const [doctaurantsDetail, setDoctaurantsDetail] = useState([]);

  useEffect(() => {
    axios
      .get(`/doktarantura/doktarantura/`)
      .then((response) => setDoctaurantsDetail(response.data.results))
      .catch((error) => console.error("Xatolik:", error));
  }, []);

  console.log(doctaurantsDetail, "doctaurantsDetail");

  const findDetail = doctaurantsDetail.find((value) => value.id === Number(id));
  console.log(findDetail, "findDetail");

  return (
    <div className={style.wrapper}>
      <div className={style.cardDetail}>
        <div className={style.detailUserImg}>
          <img src={findDetail?.file} alt={findDetail?.[`title_${lang}`]} />
        </div>

        <div>
          <p>{findDetail?.[`title_${lang}`]}</p>
          <h3 dangerouslySetInnerHTML={{ __html: findDetail?.[`works_${lang}`]}}></h3>
        </div>
      </div>
    </div>
  );
}

export default DoctaurantsDetail;
