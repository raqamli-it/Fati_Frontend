import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";
// import "./Arxiv.css";
import "./Tahririyat.css";

function Arxiv() {
  // Arxiv get jarayon qismi
  const [arxiv, setArxiv] = useState([]);
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  const ArxivGet = async () => {
    try {
      await axios
        .get("/kutobxona/arxiv/")
        .then((repons) => setArxiv(repons?.data));
    } catch (error) {}
  };

  useEffect(() => {
    ArxivGet();
  }, []);

  console.log(arxiv, "arxiv");

  return (
    <div className="tahririyat">
      <div className="tahririyat-wrapper">
        {arxiv?.map((value, index) => (
          <div key={index} className="wrapper">
            <div className="img-tahririyat">
              <img src={value?.image} alt="img" />
              {/* <p>{value?.[`title_${lang}`]}</p> */}
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

export default Arxiv;
