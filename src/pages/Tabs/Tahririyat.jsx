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
      const tahririyatPagination = await axios.get(`/kutobxona/tahririyat/`);
      setTahririyat(tahririyatPagination?.data);
    } catch (error) {
      console.log(error, "Xatolik yuz berdi");
    }
  };

  // const lang = i18n.language;

  useEffect(() => {
    TahririyatGet();
  }, []);

  console.log(tahririyat, "tahririyat www");

  return (
    <div className={style.tahririyat}>
      <div className={style["tahririyat-wrapper"]}>
        {tahririyat?.map((value, index) => (
          <div key={index} className={style.wrapper}>
            <div className={style["img-tahririyat"]}>
              <img src={value?.file} alt="img" />
              <p>
                {value?.[`degree_${lang}`]} {value?.[`sphere_${lang}`]}
              </p>
            </div>

            <div className={style.description}>
              <p className={style.title}>
                {value?.[`position_${lang}`]} : {value?.[`title_${lang}`]}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Tahririyat;
