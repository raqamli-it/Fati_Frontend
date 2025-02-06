import React, { useEffect, useState } from "react";
import generalInfo from "./generalInfo.module.css";
import { useTranslation } from "react-i18next";
import axios from "axios";

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
      <div className={generalInfo.card}>
        {data?.map((value) => (
          <div key={value.id} className={generalInfo.cards}>
            <div className={generalInfo.img}>
              <img src={value.image} alt={value?.[`title_${lang}`]} />
            </div>

            <div className={generalInfo.contants}>
              <h2>{value?.[`title_${lang}`]}</h2>

              <p
                style={{
                  transition: "all 0.5s ease-in-out",
                }}
                className={
                  openItems[value.id]
                    ? generalInfo.openText
                    : generalInfo.hiddenText
                }
                dangerouslySetInnerHTML={{ __html: value?.[`content_${lang}`] }}
              ></p>

              <button
                onClick={() => OpenBtn(value.id)}
                className={generalInfo.btn}
              >
                {openItems[value.id] ? "Yopish" : "Ko'proq o'qish"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GeneralInfo;
