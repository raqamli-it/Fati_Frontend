import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import style from "./employees.module.css";
import axios from "axios";

function EmployeesDetails({ setLoading, loading }) {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const navigate = useNavigate();

  const { type, id, detail } = useParams();
  const [employeesDetails, setEmployeesDetails] = useState([]);

  const fetchActiveData = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/markazlar-va-bolimlar/${type}/${id}`);
      setEmployeesDetails(data?.xodimlar || []);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading("show-p");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActiveData();
  }, [id]);

  const FindEmployeesDetails = employeesDetails.find(
    (item) => Number(item.id) === Number(detail)
  );

  if (loading === "show-p") {
    return <p className="show-p-error">{t("show-p-error")}</p>;
  }
  if (loading === true) {
    return <div className="loader"></div>;
  }

  console.log(employeesDetails, "salomat");
  console.log(FindEmployeesDetails, "salomat ttt");

  return (
    <div className={style.employeesDetails}>
      <h1>{FindEmployeesDetails?.[`title_${lang}`]}</h1>
      <div className={style.imgUser}>
        <img src={FindEmployeesDetails?.image} alt="Employee" />
      </div>

      <p
        dangerouslySetInnerHTML={{
          __html: FindEmployeesDetails?.[`about_${lang}`] || "",
        }}
      ></p>

      <p
        dangerouslySetInnerHTML={{
          __html: FindEmployeesDetails?.[`works_${lang}`] || "",
        }}
      ></p>
    </div>
  );
}

export default EmployeesDetails;
