import { NavLink, Outlet } from "react-router-dom";
import "./journal.css";
import talablar from "./PageIcons/talablar.png";
import arxiv from "./PageIcons/arxiv.webp";
import taxririyat from "./PageIcons/taxririyat.png";
import { BiEdit } from "react-icons/bi";
import { AiOutlineFileText } from "react-icons/ai";
import { GiArchiveResearch } from "react-icons/gi";

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
            {/* <img src={taxririyat} alt="taxririyat" /> */}
            <BiEdit />

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
            {/* <img src={talablar} alt="talablar" /> */}
            <AiOutlineFileText />
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
            {/* <img src={c} alt="arxiv" /> */}
            <GiArchiveResearch />
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
