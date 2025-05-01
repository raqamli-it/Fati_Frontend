import React from "react";
import { useTranslation } from "react-i18next";
import "./Research.css";

function Research({ activeData }) {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  const researchItems = Array.isArray(activeData?.tadqiqotlar)
    ? activeData?.tadqiqotlar
    : Array.isArray(activeData?.tadqiqot)
    ? activeData?.tadqiqot
    : [];

  console.log(researchItems, "yyyyyyyyyyyyyyyyyyy");

  return (
    <div className="tadqiqotlar">
      {Array.isArray(researchItems) && researchItems.length > 0 ? (
        researchItems.map((value, index) => (
          <div key={index}>
            {value?.image && (
              <img
                src={value.image}
                alt={value?.[`title_${lang}`]}
                style={{ width: "100%", height: "auto" }}
              />
            )}
            <p
              dangerouslySetInnerHTML={{ __html: value?.[`content_${lang}`] }}
            ></p>
          </div>
        ))
      ) : (
        <p style={{ height: "400px", width: "100%" }}>
          Ma'lumotlar mavjud emas
        </p>
      )}
    </div>
  );
}

export default Research;
