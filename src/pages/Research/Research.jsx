import React from "react";
import { useTranslation } from "react-i18next";
import "./Research.css";

function Research({ activeData }) {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  console.log(activeData, "nimalar bo'layabdid");

  return (
    <div className="tadqiqotlar">
      {(Array.isArray(activeData?.tadqiqotlar)
        ? activeData?.tadqiqotlar
        : activeData?.tadqiqot
      )?.map((value, index) => (
        <div key={index}>
          <h1>{value?.[`title_${lang}`]}</h1>
          <img src={value.image} alt={value?.[`title_${lang}`]} />
          <p
            dangerouslySetInnerHTML={{ __html: value?.[`content_${lang}`] }}
          ></p>
        </div>
      ))}
    </div>
  );
}

export default Research;
