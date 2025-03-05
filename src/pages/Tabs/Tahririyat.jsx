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
      {tahririyat?.map((value, index) => (
        <div key={index} className={style.wrapper}>
          <p>{value?.[`title_${lang}`]}</p>

          <div
            className={style.title}
            dangerouslySetInnerHTML={{ __html: value?.[`content_${lang}`] }}
          ></div>
        </div>
      ))}
    </div>
  );
}

export default Tahririyat;
