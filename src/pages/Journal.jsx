import { useEffect, useState } from "react";
// import PageTop from "../components/PageTop/PageTop";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { NavLink, Outlet } from "react-router-dom";
import "./journal.css";
import talablar from "./PageIcons/talablar.png";
import arxiv from "./PageIcons/arxiv.webp";
import taxririyat from "./PageIcons/taxririyat.png";

export const Journal = ({ setLoading, loading }) => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  const [archiveMenuData, setArchiveMenuData] = useState([]);

  const fetchData = async () => {
    try {
      setLoading(true);
      await axios
        .get("/kutobxona/arxiv/")
        .then((req) => setArchiveMenuData(req.data));
      setLoading(false);
    } catch (error) {
      setLoading("show-p");
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  // if (loading === "show-p") {
  //   return <p className="show-p-error">{t("show-p-error")}</p>;
  // }
  // if (loading === true) {
  //   return <div className="loader"></div>;
  // }

  return (
    <div className="journal-page">
      <div className="links">
        <div className="navLinkWrapper">
          <NavLink
            to="tahririyat"
            style={({ isActive }) => ({
              backgroundColor: isActive ? "#ff0000aa" : "",
              fontWeight: isActive ? 700 : 700,
              color: isActive ? "white" : "",
            })}
            className="effect-btns"
          >
            <img src={taxririyat} alt="taxririyat" />

            <span>TAHRIRIYAT</span>
          </NavLink>

          <NavLink
            to="talablar"
            style={({ isActive }) => ({
              backgroundColor: isActive ? "#ff0000aa" : "",
              fontWeight: isActive ? 700 : 700,
              color: isActive ? "white" : "",
            })}
            className="effect-btns"
          >
            <img src={talablar} alt="talablar" />
            <span>TALABLAR</span>
          </NavLink>

          <NavLink
            to="arxiv"
            style={({ isActive }) => ({
              backgroundColor: isActive ? "#ff0000aa" : "",
              fontWeight: isActive ? 700 : 700,
              color: isActive ? "white" : "",
            })}
            className="effect-btns"
          >
            <img src={arxiv} alt="arxiv" />
            <span>ARXIV</span>
          </NavLink>
        </div>
      </div>

      <div className="tabLine">
        <Outlet />
      </div>
    </div>
  );
};
