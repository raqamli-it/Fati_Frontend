import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";
import style from "./Talablar.module.css";

function Talablar() {
  // Talablar get jarayon qismi
  const [talablar, setTalablar] = useState([]);
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  const TalablarGet = async () => {
    try {
      await axios
        .get(`/kutobxona/talablar/`)
        .then((repons) => setTalablar(repons?.data));
    } catch (error) {}
  };

  useEffect(() => {
    TalablarGet();
  }, []);

  console.log(talablar, "talablar");

  return (
    <div className={style.talablar}>
      <div className={style["talablar-wrapper"]}>
        {talablar?.map((value, index) => (
          <div key={index} className={style.wrapper}>
            <p className={style.title}>{value?.[`title_${lang}`]}</p>
            <div className={style["img-talablar"]}>
              <img src={value?.image} alt="img" />
            </div>

            <div
              className={style.description}
              dangerouslySetInnerHTML={{ __html: value?.[`content_${lang}`] }}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Talablar;
