import { NavLink, Outlet } from "react-router-dom";
import "./journal.css";
import talablar from "./PageIcons/talablar.png";
import arxiv from "./PageIcons/arxiv.webp";
import taxririyat from "./PageIcons/taxririyat.png";

export const Journal = ({ setLoading, loading }) => {
  return (
    <div className="journal-page">
      <div className="links">
        <div className="navLinkWrapper">
          <NavLink
            to="tahririyat"
            style={({ isActive }) => ({
              backgroundColor: isActive ? "#023e8a" : "",
              color: isActive ? "white" : "",
            })}
            className="effect-btns"
          >
            <img src={taxririyat} alt="taxririyat" />

            <span style={{ color: "inherit" }}>TAHRIRIYAT</span>
          </NavLink>

          <NavLink
            to="talablar"
            style={({ isActive }) => ({
              backgroundColor: isActive ? "#023e8a" : "",
              color: isActive ? "white" : "",
            })}
            className="effect-btns"
          >
            <img src={talablar} alt="talablar" />
            <span style={{ color: "inherit" }}>TALABLAR</span>
          </NavLink>

          <NavLink
            to="arxiv"
            style={({ isActive }) => ({
              backgroundColor: isActive ? "#023e8a" : "",
              color: isActive ? "white" : "",
            })}
            className="effect-btns"
          >
            <img src={arxiv} alt="arxiv" />
            <span style={{ color: "inherit" }}>ARXIV</span>
          </NavLink>
        </div>
      </div>

      <div className="tabLine">
        <Outlet />
      </div>
    </div>
  );
};
