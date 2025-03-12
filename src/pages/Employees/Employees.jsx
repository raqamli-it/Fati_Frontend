import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import style from "./employees.module.css";
import { IoMdArrowRoundBack } from "react-icons/io";

function Employees({ activeData, setActivePage }) {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const navigate = useNavigate();

  console.log(activeData, "activeData wwww");

  return (
    <div className={style.container}>
      <button className={style["back-button"]} onClick={() => setActivePage(0)}>
        <IoMdArrowRoundBack fontSize={"22px"} />
        Orqaga
      </button>

      <div className={style.employeesX}>
        {(Array.isArray(activeData.xodimlar)
          ? activeData.xodimlar
          : activeData.xodim
        )
          ?.sort((a, b) => a.order - b.order)
          ?.map((value, index) => (
            <div key={index} className={style.card}>
              <div className={style.img}>
                <img src={value.image} alt="" />
              </div>

              <div className={style.description}>
                <span className={style.name}>
                  {value?.[`full_name_${lang}`]}
                </span>

                <p>{value?.[`position_${lang}`]}</p>
                <p>{value?.[`degree_${lang}`]}</p>

                <button
                  onClick={() =>
                    navigate(`/centers-and-departments/${value.id}`)
                  }
                  title="Batafsil ko'ring"
                  className={style.detail}
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
