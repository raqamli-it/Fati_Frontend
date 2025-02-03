import styles from "./centers-and-departments.module.css";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, NavLink, Outlet } from "react-router-dom";
import { MdDashboardCustomize } from "react-icons/md";
import { FaUserFriends } from "react-icons/fa";
import { GiArchiveResearch } from "react-icons/gi";
import { FaPhotoVideo } from "react-icons/fa";

export const CentersAndDepartments = ({ setLoading, loading }) => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        await axios
          .get("/markazlar-va-bolimlar/markazlar_bolimlar/")
          .then((req) => setData(req.data));
        setLoading(false);
      } catch (error) {
        setLoading("show-p");
      }
    };
    fetchData();
  }, [setLoading]);

  if (loading === "show-p") {
    return <p className="show-p-error">{t("show-p-error")}</p>;
  }
  if (loading === true) {
    return <div className="loader"></div>;
  }

  console.log(data, "XXXXX");

  return (
    <section className={styles["center-departments"]}>
      <div className={styles.bg_img}>
        <div className={styles.tab}>
          <NavLink
            style={({ isActive }) => ({
              color: isActive && "red",
              border: isActive && "3px solid red",
            })}
            to={"generalInfo"}
            className={styles.links}
          >
            <MdDashboardCustomize className={styles.icon} />
            <h3>umumiy ma'lumot</h3>
          </NavLink>
          <NavLink
            style={({ isActive }) => ({
              color: isActive && "red",
              border: isActive && "3px solid red",
            })}
            to={"employees"}
            className={styles.links}
          >
            <FaUserFriends className={styles.icon} />
            <h3>xodimlar</h3>
          </NavLink>
          <NavLink
            style={({ isActive }) => ({
              color: isActive && "red",
              border: isActive && "3px solid red",
            })}
            to={"research"}
            className={styles.links}
          >
            <GiArchiveResearch className={styles.icon} />
            <h3>tadqiqotlar</h3>
          </NavLink>
          <NavLink
            style={({ isActive }) => ({
              color: isActive && "red",
              border: isActive && "3px solid red",
            })}
            to={"photoVideo"}
            className={styles.links}
          >
            <FaPhotoVideo className={styles.icon} />
            <h3>foto va video</h3>
          </NavLink>
        </div>
      </div>

      <div className={styles.tab_card}>
        <Outlet />
      </div>
    </section>
  );
};
