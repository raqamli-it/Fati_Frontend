import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import employees from "./Employees.module.css";

function Employees({ activeData }) {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const navigate = useNavigate();

  console.log(activeData, "activeData");

  return (
    <div className={employees.container}>
      <div className={employees.employees}>
        {(Array.isArray(activeData.xodimlar)
          ? activeData.xodimlar
          : activeData.xodim
        )?.map((value, index) => (
          <div key={index} className={employees.card}>
            <div className={employees.img}>
              <img src={value.image} alt="" />
            </div>

            <div className={employees.acardion}>
              <span className={employees.name}>
                {value?.[`ful_name_${lang}`]}
              </span>

              <span
                dangerouslySetInnerHTML={{ __html: value?.[`about_${lang}`] }}
              ></span>

              <button
                onClick={() => navigate(`/centers-and-departments/${value.id}`)}
                title="Batafsil ko'ring"
                className={employees.detail}
              >
                Batafsil
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Employees;
