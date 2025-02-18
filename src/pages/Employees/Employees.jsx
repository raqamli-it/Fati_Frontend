import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Slide } from "react-awesome-reveal";
import employees from "./employees.module.css";

function Employees({ activeData }) {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const navigate = useNavigate();

  // console.log(activeData.xodimlar, "activeData");

  return (
    <div className={employees.employees}>
      <div>
        <div className={employees.img}>
          <img src={activeData?.image} />
        </div>

        <div className={employees["employees-card"]}>
          <h3>{activeData?.[`academic_degree_${lang}`]}</h3>
          <h3>{activeData?.[`title_${lang}`]}</h3>
          <div className={employees.button}>
            <Slide direction={employees.right} cascade>
              <button onClick={() => navigate(`${activeData.id}`)}>
                Batafsil ko'rish
              </button>
            </Slide>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Employees;
