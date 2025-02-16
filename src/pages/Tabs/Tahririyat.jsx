import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";
import style from "./Tahririyat.module.css";

function Tahririyat() {
  // Tahririyat get jarayon qismi
  const [tahririyat, setTahririyat] = useState([]);
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  const TahririyatGet = async () => {
    try {
      await axios
        .get("/kutobxona/tahririyat/")
        .then((repons) => setTahririyat(repons?.data));
    } catch (error) {}
  };

  // const lang = i18n.language;

  useEffect(() => {
    TahririyatGet();
  }, []);

  // Tahririyat get jarayon qismi
  console.log(tahririyat, "salom");

  return (
    <div className={style.tahririyat}>
      <div className={style["tahririyat-wrapper"]}>
        {tahririyat?.map((value, index) => (
          <div key={index} className={style.wrapper}>
            <div className={style["img-tahririyat"]}>
              <img src={value?.file} alt="img" />
              <p>{value?.[`degree_${lang}`]}</p>
            </div>

            <div className={style.description}>
              <p className={style.title}>{value?.[`position_${lang}`]}</p>
              <p
                dangerouslySetInnerHTML={{ __html: value?.[`content_${lang}`] }}
              ></p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Tahririyat;
