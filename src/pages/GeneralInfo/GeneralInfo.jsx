import React, { useState } from "react";
import generalInfo from "./generalInfo.module.css";
import { useTranslation } from "react-i18next";
import { IoMdArrowRoundBack } from "react-icons/io";

function GeneralInfo({ activeData, setActivePage }) {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  return (
    <div className={generalInfo.generalInfo}>
      <div className={generalInfo.img}>
        <button
          className={generalInfo["back-button"]}
          onClick={() => setActivePage(0)}
        >
          <IoMdArrowRoundBack fontSize={"22px"} />
          Orqaga
        </button>
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
