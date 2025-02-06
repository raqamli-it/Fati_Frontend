import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Slide } from "react-awesome-reveal";
import employees from "./employees.module.css";

function Employees({ activeData }) {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const navigate = useNavigate();

  console.log(activeData[0], "xxxx");

  if (activeData?.length > 0 && activeData[0]?.image) {
    console.log(activeData[0].image, "xxxx");
  } else {
    console.log("Ma'lumot yo'q yoki hali yuklanmagan", "xxxx");
  }
  return (
    <div className={employees.employees}>
      {activeData[0]?.xodimlar?.map((value, index) => (
        <div key={index}>
          <div className={employees.img}>
            <img src={value.image} />
          </div>

          <div className={employees["employees-card"]}>
            <h3>{value?.[`academic_degree_${lang}`]}</h3>
            <h3>{value?.[`title_${lang}`]}</h3>
            <div className={employees.button}>
              <Slide direction={employees.right} cascade>
                <button onClick={() => navigate(`${value.id}`)}>
                  Batafsil ko'rish
                </button>
              </Slide>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Employees;
