import React, { useEffect, useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import style from "./Photos.module.css";
import { useParams } from "react-router-dom";

function PhotosDetail({ setLoading, loading }) {
  const [data, setData] = useState([]);
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const { id } = useParams();

  const getPhotos = async () => {
    try {
      setLoading(true);
      const respons = await axios.get(`/markazlar-bolimlar/photo/`);
      setData(respons.data);
    } catch (error) {
      setLoading("show-p");
      console.log(error, "error");
    }
  };

  useEffect(() => {
    getPhotos();
  }, []);

  const photoDetailId = data.find((value) => value.id === Number(id));

  return (
    <div className={style.container}>
      <div className={style.cardDetail}>
        {photoDetailId?.rasmlar.map((item, index) => (
          <div key={index} className={style.cardDetailImg}>
            <img src={item?.image} alt={item?.image} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default PhotosDetail;
