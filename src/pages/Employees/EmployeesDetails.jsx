import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import style from "./employees.module.css";
import axios from "axios";

function EmployeesDetails({ setLoading, loading }) {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const navigate = useNavigate();

  const [employeesDetails, setEmployeesDetails] = useState([]);
  const { detail } = useParams();
  const { id } = useParams();

  const fetchActiveData = async () => {
    try {
      setLoading(true);
      await axios
        .get(`/markazlar-va-bolimlar/markazlar_bolimlar/${id}`)
        .then((req) => setEmployeesDetails(req.data.xodimlar));
      setLoading(false);
    } catch (error) {
      setLoading("show-p");
    }
  };

  const FindEmployeesDetails = employeesDetails.find(
    (item) => item.id === Number(detail)
  );

  useEffect(() => {
    fetchActiveData();
  }, []);

  if (loading === "show-p") {
    return <p className="show-p-error">{t("show-p-error")}</p>;
  }
  if (loading === true) {
    return <div className="loader"></div>;
  }

  console.log(FindEmployeesDetails, "MEN KAMOLIDDIN");

  console.log(employeesDetails, "MEN");

  return (
    <div className={style.employeesDetails}>
      <h1>{FindEmployeesDetails?.[`title_${lang}`]}</h1>
      <div className={style.imgUser}>
        <img src={FindEmployeesDetails?.image} alt="" />
      </div>

      <p
        dangerouslySetInnerHTML={{
          __html: FindEmployeesDetails?.[`about_${lang}`],
        }}
      ></p>

      <p
        dangerouslySetInnerHTML={{
          __html: FindEmployeesDetails?.[`works_${lang}`],
        }}
      ></p>
    </div>
  );
}

export default EmployeesDetails;
