import React, { useEffect, useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { FaPlay } from "react-icons/fa6";
import style from "./Listenings.module.css";

function Listenings({ setLoading, loading }) {
  const [data, setData] = useState([]);
  const [listenings, setListenings] = useState(null);
  const audioRef = useRef(null); // Audio elementni boshqarish uchun
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  const getListeningsData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/markazlar-bolimlar/audio/`);
      setData(response.data);
    } catch (error) {
      setLoading("show-p");
      console.log(error, "error");
    }
  };

  useEffect(() => {
    getListeningsData();
  }, []);

  const ListeningsBtn = (audioSrc) => {
    setListenings(audioSrc); // Audio src-ni o'zgartiramiz
    if (audioRef.current) {
      audioRef.current.load(); // Yangi audio yuklash
      audioRef.current.play(); // Avtomatik o'ynash
    }
  };

  console.log(data, "nimala olamada");

  return (
    <div className={style.container}>
      {data &&
        data?.slice(0, 1).map((item, index) => (
          <div key={index} className={style.wrapper}>
            <div className={style.cards}>
              <img src={item?.image} alt={item?.[`title_${lang}`]} />

              <audio
                ref={audioRef}
                controls
                style={{
                  width: "100%",
                  marginTop: "15px",
                }}
              >
                <source src={listenings} type="audio/mpeg" />
              </audio>
            </div>

            <div className={style.listeningCard}>
              {item?.audiolar.map((value, idx) => (
                <div key={idx}>
                  <button onClick={() => ListeningsBtn(value.audio)}>
                    <FaPlay fontSize={"25px"} />
                    Eshitish
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
    </div>
  );
}

export default Listenings;
