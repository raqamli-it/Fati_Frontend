import styles from "./centers-and-departments.module.css";
import { useTranslation } from "react-i18next";
import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { MdDashboardCustomize } from "react-icons/md";
import { FaUserFriends, FaPhotoVideo } from "react-icons/fa";
import { GiArchiveResearch } from "react-icons/gi";
import GeneralInfo from "../GeneralInfo/GeneralInfo";
import Employees from "../Employees/Employees";
import Research from "../Research/Research";

export const CentersAndDepartments = ({ setLoading, loading }) => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const [activePage, setActivePage] = useState(1);
  const { type, id } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState([]);

  useEffect(() => {
    if (!type || (type !== "bolim" && type !== "markaz")) {
      navigate("/not-found");
    }
  }, [type, navigate]);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const path = `/markazlar-bolimlar/${type}/${id}`;
      const { data } = await axios.get(path);
      setData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading("show-p");
    } finally {
      setLoading(false);
    }
  }, [id, type]);

  useEffect(() => {
    if (type === "markaz" || type === "bolim") {
      fetchData();
    }
  }, [type, id]); // id ham dependencyga qo‘shildi

  if (loading === "show-p") {
    return <p className="show-p-error">{t("show-p-error")}</p>;
  }

  if (loading) {
    return <div className="loader"></div>;
  }

  return (
    <section className={styles["center-departments"]}>
      <div className={styles.bg_img}>
        <div className={styles.tab}>
          {[
            {
              id: 1,
              icon: <MdDashboardCustomize size={50} />,
              label: t("malumotlar"),
            },

            { id: 2, icon: <FaUserFriends size={50} />, label: t("xodimlar") },

            {
              id: 3,
              icon: <GiArchiveResearch size={50} />,
              label: t("tadqiqotlar"),
            },
          ].map((tab) => (
            <button
              key={tab.id}
              style={{
                color: activePage === tab.id ? "#023E8A" : "",
                border: activePage === tab.id ? "3px solid #023E8A" : "",
              }}
              onClick={() => setActivePage(tab.id)}
              className={styles.links}
            >
              {tab.icon}
              <h3>{tab.label}</h3>
            </button>
          ))}
        </div>
      </div>

      <div className={styles.tab_card}>
        {activePage === 1 && <GeneralInfo data={data} />}
        {/* {activePage === 2 && <Employees activeData={data} />} */}
        {activePage === 3 && <Research activeData={data} />}
      </div>
    </section>
  );
};
