import React, { useEffect, useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { FaPlay } from "react-icons/fa6";
import style from "./Views.module.css";

function Views({ setLoading }) {
  const [data, setData] = useState([]);
  const [videoSrc, setVideoSrc] = useState(null);
  const videoRef = useRef(null); // Video elementni boshqarish uchun
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  const getViewsData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/markazlar-bolimlar/video/`);
      setData(response.data);
    } catch (error) {
      setLoading("show-p");
      console.log(error, "error");
    }
  };

  useEffect(() => {
    getViewsData();
  }, []);

  const handleVideoPlay = (videoUrl) => {
    setVideoSrc(videoUrl);
    if (videoRef.current) {
      videoRef.current.load(); // Yangi videoni yuklash
      videoRef.current.play(); // Avtomatik o‘ynash
    }
  };

  return (
    <div className={style.container}>
      {data &&
        data?.slice(0, 1).map((item, index) => (
          <div key={index} className={style.wrapper}>
            <div className={style.cards}>
              <video
                ref={videoRef}
                controls
                width="100%"
                poster={item.image}
                style={{
                  borderRadius: "10px",
                  height: "100%",
                }}
              >
                <source
                  style={{ height: "100%" }}
                  src={videoSrc}
                  type="video/mp4"
                />
              </video>
            </div>

            <div className={style.listeningCard}>
              {item?.videolar.map((value, idx) => (
                <button key={idx} onClick={() => handleVideoPlay(value.video)}>
                  <FaPlay fontSize={"25px"} />
                  {t("Play Video")}
                </button>
              ))}
            </div>
          </div>
        ))}
    </div>
  );
}

export default Views;
