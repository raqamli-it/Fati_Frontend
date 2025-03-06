import React, { useState } from "react";
import generalInfo from "./generalInfo.module.css";
import { useTranslation } from "react-i18next";

function GeneralInfo({ data }) {
  const [openItems, setOpenItems] = useState({});
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  const OpenBtn = (id) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className={generalInfo.generalInfo}>
      <div className={generalInfo.img}>
        <img src={data.image} alt={data?.[`title_${lang}`]} />
      </div>

      <div className={generalInfo.contants}>
        <h2>{data?.[`title_${lang}`]}</h2>

        <p
          style={{
            transition: "all 0.5s ease-in-out",
          }}
          className={
            openItems[data.id] ? generalInfo.openText : generalInfo.hiddenText
          }
          dangerouslySetInnerHTML={{ __html: data?.[`content_${lang}`] }}
        ></p>

        <button onClick={() => OpenBtn(data.id)} className={generalInfo.btn}>
          {openItems[data.id] ? "Yopish" : "Ko'proq o'qish"}
        </button>
      </div>
    </div>
  );
}

export default GeneralInfo;
