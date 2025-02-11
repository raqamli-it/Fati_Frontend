import styles from "./centers-and-departments.module.css";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { MdDashboardCustomize } from "react-icons/md";
import { FaUserFriends } from "react-icons/fa";
import { GiArchiveResearch } from "react-icons/gi";
import { FaPhotoVideo } from "react-icons/fa";
import GeneralInfo from "../GeneralInfo/GeneralInfo";
import Employees from "../Employees/Employees";
import Research from "../Research/Research";
import PhotoVideo from "../PhotoVideo/PhotoVideo";

export const CentersAndDepartments = ({ setLoading, loading }) => {
  const { t, i18n } = useTranslation();
  const [activePage, setActivePage] = useState(1);

  const { id } = useParams();

  const lang = i18n.language;

  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      setLoading(true);
      await axios
        .get(`/markazlar-bolimlar/bolim/${id}`)
        .then((req) => setData(req.data));
      setLoading(false);
    } catch (error) {
      setLoading("show-p");
    }
  };
  // http://backend.fati.uz/markazlar-bolimlar/bolim/1
  useEffect(() => {
    fetchData();
  }, [setLoading]);

  if (loading === "show-p") {
    return <p className="show-p-error">{t("show-p-error")}</p>;
  }

  if (loading === true) {
    return <div className="loader"></div>;
  }

  // const activeDataFilter = data.filter((value) => value.id === Number(id));

  console.log(data, "sss");

  return (
    <section className={styles["center-departments"]}>
      <div className={styles.bg_img}>
        <div className={styles.tab}>
          <button
            style={{
              color: activePage === 1 ? "rgb(189, 21, 21)" : "",
              border: activePage === 1 ? "3px solid rgb(189, 21, 21)" : "",
            }}
            onClick={() => setActivePage(1)}
            className={styles.links}
          >
            <MdDashboardCustomize className={styles.icon} />
            <h3>umumiy ma'lumot</h3>
          </button>

          <button
            style={{
              color: activePage === 2 ? "rgb(189, 21, 21)" : "",
              border: activePage === 2 ? "3px solid rgb(189, 21, 21)" : "",
            }}
            onClick={() => setActivePage(2)}
            className={styles.links}
          >
            <FaUserFriends className={styles.icon} />
            <h3>xodimlar</h3>
          </button>

          <button
            style={{
              color: activePage === 3 ? "rgb(189, 21, 21)" : "",
              border: activePage === 3 ? "3px solid rgb(189, 21, 21)" : "",
            }}
            onClick={() => setActivePage(3)}
            className={styles.links}
          >
            <GiArchiveResearch className={styles.icon} />
            <h3>tadqiqotlar</h3>
          </button>

          <button
            style={{
              color: activePage === 4 ? "rgb(189, 21, 21)" : "",
              border: activePage === 4 ? "3px solid rgb(189, 21, 21)" : "",
            }}
            onClick={() => setActivePage(4)}
            className={styles.links}
          >
            <FaPhotoVideo className={styles.icon} />
            <h3>foto va video</h3>
          </button>
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
