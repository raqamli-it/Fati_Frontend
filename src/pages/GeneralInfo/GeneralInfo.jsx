import React, { useState } from "react";
import generalInfo from "./generalInfo.module.css";
import { useTranslation } from "react-i18next";
import { FaArrowLeftLong } from "react-icons/fa6";

function GeneralInfo({ activeData, setActivePage }) {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  console.log(activeData, "activeData");

  return (
    <div className={generalInfo.generalInfo}>
      <button
        title="Sahifadan chiqish"
        className={generalInfo["back-button"]}
        onClick={() => setActivePage(0)}
      >
        <FaArrowLeftLong fontSize={"22px"} />
        Sahifadan chiqish
      </button>
      
      <div className={generalInfo.img}>
        <img src={activeData.image} alt={activeData?.[`title_${lang}`]} />
      </div>

      <div className={generalInfo.contants}>
        <h2>{activeData?.[`title_${lang}`]}</h2>
        <div
          dangerouslySetInnerHTML={{ __html: activeData?.[`content_${lang}`] }}
        ></div>
      </div>
    </div>
  );
}

export default GeneralInfo;
