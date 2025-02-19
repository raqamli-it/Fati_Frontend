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
import PhotoVideo from "../PhotoVideo/PhotoVideo";

export const CentersAndDepartments = ({ setLoading, loading }) => {
  const { t, i18n } = useTranslation();
  const [activePage, setActivePage] = useState(1);
  const { type, id } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const lang = i18n.language;

  useEffect(() => {
    if (!type || (type !== "bolim" && type !== "markaz")) {
      navigate("/not-found");
    }
  }, [type, navigate]);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);

      // Type va id ni tekshiramiz

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

  console.log(data, "nimalar olamda");

  return (
    <section className={styles["center-departments"]}>
      <div className={styles.bg_img}>
        <div className={styles.tab}>
          {[
            {
              id: 1,
              icon: <MdDashboardCustomize size={36} />,
              label: t("umumiy ma'lumot"),
            },

            { id: 2, icon: <FaUserFriends size={36} />, label: t("xodimlar") },

            {
              id: 3,
              icon: <GiArchiveResearch size={36} />,
              label: t("tadqiqotlar"),
            },

            {
              id: 4,
              icon: <FaPhotoVideo size={36} />,
              label: t("foto va video"),
            },
          ].map((tab) => (
            <button
              key={tab.id}
              style={{
                color: activePage === tab.id ? "rgb(189, 21, 21)" : "",
                border:
                  activePage === tab.id ? "3px solid rgb(189, 21, 21)" : "",
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
        {activePage === 2 && <Employees activeData={data} />}
        {activePage === 3 && <Research activeData={data} />}
        {activePage === 4 && <PhotoVideo activeData={data} />}
      </div>
    </section>
  );
};
