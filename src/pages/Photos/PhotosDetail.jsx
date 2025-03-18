import React, { useEffect, useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import style from "./Photos.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import { Zoom } from "react-awesome-reveal";

function PhotosDetail({ setLoading, loading }) {
  const [data, setData] = useState([]);
  const [activeImg, setActiveImg] = useState(null);
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const { id } = useParams();
  const navigate = useNavigate();

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

  console.log(photoDetailId, "photoDetailId");
  console.log(activeImg, "activeImg");

  return (
    <div className={style.container}>
      {activeImg === null ? (
        <div>
          <button
            className={style["back-button"]}
            title="Sahifadan chiqish"
            onClick={() => navigate(-1)}
          >
            <FaArrowLeftLong
              style={{
                fontSize: "24px",
                color: "blue",
                cursor: "pointer",
              }}
            />
            Sahifadan chiqish
          </button>

          <div className={style.cardDetail}>
            {photoDetailId?.rasmlar.map((item, index) => (
              <div key={index} className={style.cardDetailImg}>
                <img
                  onClick={() => setActiveImg(item.image)}
                  src={item?.image}
                  alt={item?.image}
                />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div
          onClick={() => setActiveImg(null)}
          className={style.activeImgContainer}
        >
          <div>
            <Zoom>
              <img src={activeImg} alt="Zoomed Image" />
            </Zoom>
          </div>
        </div>
      )}
    </div>
  );
}

export default PhotosDetail;
