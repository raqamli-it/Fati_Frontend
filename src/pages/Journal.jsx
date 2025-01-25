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
  const [tahrirchilarData, setTahrirchilarData] = useState([]);
  const [archiveMenuData, setArchiveMenuData] = useState([]);

  const fetchData = async () => {
    try {
      setLoading(true);
      await axios
        .get("/kutobxona/tahrirchilar/")
        .then((req) => setTahrirchilarData(req.data));
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

  console.log(archiveMenuData, "qqqqqq");

  return (
    <div className="journal-page">
      <div className="links">
        <div className="navLinkWrapper">
          <div className="effect-btns">
            <NavLink
              to="tahririyat"
              style={({ isActive }) => ({
                // color: isActive ? "gray" : "",
                fontWeight: isActive ? 700 : 700,
              })}
            >
              <img src={taxririyat} alt="taxririyat" />
              TAHRIRIYAT
            </NavLink>
          </div>

          <div className="effect-btns">
            <NavLink
              to="talablar"
              style={({ isActive }) => ({
                // color: isActive ? "gray" : "",
                fontWeight: isActive ? 700 : 700,
              })}
            >
              <img src={talablar} alt="talablar" />
              TALABLAR
            </NavLink>
          </div>

          <div className="effect-btns">
            <NavLink
              to="arxiv"
              style={({ isActive }) => ({
                // color: isActive ? "gray" : "",
                fontWeight: isActive ? 700 : 700,
              })}
            >
              ARXIV
            </NavLink>
            <img src={arxiv} alt="arxiv" />
          </div>
        </div>
      </div>

      <div className="tabLine">
        <Outlet />
      </div>
    </div>
  );
};
