import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";
// import "./Talablar.css";
import "./Tahririyat.css";

function Talablar() {
  // Talablar get jarayon qismi
  const [talablar, setTalablar] = useState([]);
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  const TalablarGet = async () => {
    try {
      await axios
        .get("/kutobxona/talablar/")
        .then((repons) => setTalablar(repons?.data));
    } catch (error) {}
  };

  useEffect(() => {
    TalablarGet();
  }, []);


  return (
    <div className="tahririyat">
      <div className="tahririyat-wrapper">
        {talablar?.map((value, index) => (
          <div key={index} className="wrapper">
            <div className="img-tahririyat">
              <img src={value?.image} alt="img" />
              {/* <p>{value?.[`degree_${lang}`]}</p> */}
            </div>

            <div className="description">
              <p className="title">{value?.[`title_${lang}`]}</p>
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

export default Talablar;
