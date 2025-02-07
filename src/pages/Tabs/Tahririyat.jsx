import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";
import "./Tahririyat.css";

function Tahririyat() {
  // Tahririyat get jarayon qismi
  const [tahririyat, setTahririyat] = useState([]);
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  const TahririyatGet = async () => {
    try {
      await axios
        .get("/kutobxona/Tahririyat/")
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
    <div className="tahririyat">
      <div className="tahririyat-wrapper">
        {tahririyat?.map((value, index) => (
          <div key={index} className="wrapper">
            <div className="img-tahririyat">
              <img src={value?.file} alt="img" />
              <p>{value?.[`degree_${lang}`]}</p>
            </div>

            <div className="description">
              <p className="title">{value?.[`position_${lang}`]}</p>
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
