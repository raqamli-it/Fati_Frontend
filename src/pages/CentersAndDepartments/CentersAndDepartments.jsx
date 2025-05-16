import styles from "./centers-and-departments.module.css";
import { useTranslation } from "react-i18next";
import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { MdDashboardCustomize } from "react-icons/md";
import { FaUserFriends, FaPhotoVideo } from "react-icons/fa";
import { FaArrowLeftLong } from "react-icons/fa6";
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
  }, [type, id]);

  if (loading === "show-p") {
    return <p className="show-p-error">{t("show-p-error")}</p>;
  }

  if (loading) {
    return <div className="loader"></div>;
  }

  console.log(data, "data");

  return (
    <section className={styles["center-departments"]}>
      <div>
        <div
          className={`${styles.bg_img} ${
            activePage !== 1 && styles.bg_img_top
          }`}
        >
          <img
            src={data?.file}
            alt={data?.[`title_${lang}`]}
            style={{
              opacity: activePage !== 1 ? 0 : 1,
              transition:
                activePage !== 1
                  ? "opacity 0.4s ease-in-out"
                  : "opacity 0.7s ease-in-out",
            }}
          />
        </div>

        <div className={styles.tabs}>
          <div className={styles.tab}>
            <button onClick={() => navigate(-1)} className={styles.links}>
              <h3>
                <FaArrowLeftLong
                  style={{ fontSize: "22px", marginTop: "6px" }}
                />
              </h3>
            </button>

            <button
              style={{
                color: activePage === Number(1) && "#000",
                backgroundColor: activePage === Number(1) && "white",
              }}
              onClick={() => setActivePage(1)}
              className={styles.links}
            >
              <h3>{t("malumotlar")}</h3>
            </button>

            <button
              style={{
                color: activePage === Number(2) && "#000",
                backgroundColor: activePage === Number(2) && "white",
              }}
              onClick={() => setActivePage(2)}
              className={styles.links}
            >
              <h3>{t("xodimlar")}</h3>
            </button>

            <button
              style={{
                color: activePage === Number(3) && "#000",
                backgroundColor: activePage === Number(3) && "white",
              }}
              onClick={() => setActivePage(3)}
              className={styles.links}
            >
              <h3>{t("tadqiqotlar")}</h3>
            </button>
          </div>
        </div>
      </div>

      <div className={styles.tab_card}>
        {activePage === 1 && (
          <GeneralInfo activeData={data} setActivePage={setActivePage} />
        )}
        {activePage === 2 && (
          <Employees activeData={data} setActivePage={setActivePage} />
        )}
        {activePage === 3 && (
          <Research activeData={data} setActivePage={setActivePage} />
        )}
      </div>
    </section>
  );
};
