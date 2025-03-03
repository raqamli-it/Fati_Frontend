import React, { useEffect, useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import style from "./Photos.module.css";
import { Link, useNavigate } from "react-router-dom";

function Photos({ setLoading, loading }) {
  const [data, setData] = useState([]);
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  const navigate = useNavigate();

  const getPhotos = async () => {
    try {
      setLoading(true);
      const respons = await axios.get("/markazlar-bolimlar/photo/");
      setData(respons.data);
    } catch (error) {
      setLoading("show-p");
      console.log(error, "error");
    }
  };

  useEffect(() => {
    getPhotos();
  }, []);

  console.log(data, "data");

  return (
    <div className={style.container}>
      <div className={style.card}>
        {data.length > 0 ? (
          data.map((value, index) => (
            <div key={index} className={style.cards}>
              <div className={style.img}>
                <img src={value.image} alt={value?.[`title_${lang}`]} />
              </div>
              <Link to={`/photos/${value.id}`}>
                <p>{value?.[`title_${lang}`]}</p>
              </Link>
            </div>
          ))
        ) : (
          <p>{t("show-p-error")}</p>
        )}
      </div>
    </div>
  );
}

export default Photos;
