import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import employees from "./employees.module.css";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { MdFileDownload } from "react-icons/md";

function Employees({ activeData }) {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const navigate = useNavigate();

  console.log(activeData.xodimlar, "activeData");

  return (
    <div className={employees.employees}>
      {(Array.isArray(activeData.xodimlar)
        ? activeData.xodimlar
        : activeData.xodim
      )?.map((value, index) => (
        <div key={index} className={employees.card}>
          <div className={employees.img}>
            <img src={value.image} alt="" />
          </div>

          <div className={employees.acardion}>
            <span className={employees.name}>
              {value?.[`ful_name_${lang}`]}
            </span>

            <Accordion sx={{ boxShadow: "none", marginBottom: "15px" }}>
              <AccordionSummary
                style={{
                  backgroundColor: "gray",
                  height: "50px",
                  color: "white",
                }}
                expandIcon={<ExpandMoreIcon style={{ color: "white" }} />}
              >
                <Typography
                  component="div"
                  style={{ fontSize: "20px", margin: "0" }}
                >
                  Xaqida
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <div
                  style={{
                    maxHeight: "200px",
                    overflowY: "auto",
                    fontSize: "18px",
                    fontWeight: "500",
                    fontFamily: "Poppins, sans-serif",
                  }}
                  dangerouslySetInnerHTML={{
                    __html: value?.[`about_${lang}`] || "",
                  }}
                />
              </AccordionDetails>
            </Accordion>

            <Accordion sx={{ boxShadow: "none", marginBottom: "15px" }}>
              <AccordionSummary
                style={{
                  backgroundColor: "gray",
                  height: "50px",
                  color: "white",
                }}
                expandIcon={<ExpandMoreIcon style={{ color: "white" }} />}
              >
                <Typography component="div" style={{ fontSize: "20px" }}>
                  Active
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <div
                  style={{
                    maxHeight: "200px",
                    overflowY: "auto",
                    fontSize: "18px",
                    fontWeight: "500",
                    fontFamily: "Poppins, sans-serif",
                  }}
                  dangerouslySetInnerHTML={{
                    __html: value?.[`activity_${lang}`] || "",
                  }}
                />
              </AccordionDetails>
            </Accordion>

            <Accordion sx={{ boxShadow: "none" }}>
              <AccordionSummary
                style={{
                  backgroundColor: "gray",
                  height: "50px",
                  color: "white",
                }}
                expandIcon={<ExpandMoreIcon style={{ color: "white" }} />}
              >
                <Typography component="div" style={{ fontSize: "20px" }}>
                  Ishlari
                </Typography>
              </AccordionSummary>

              <AccordionDetails>
                <div
                  style={{
                    maxHeight: "200px",
                    overflowY: "auto",
                    fontSize: "18px",
                    fontWeight: "500",
                    fontFamily: "Poppins, sans-serif",
                  }}
                  dangerouslySetInnerHTML={{
                    __html: value?.[`works_${lang}`] || "",
                  }}
                />
              </AccordionDetails>
            </Accordion>

            <a
              className={employees.bookDownload}
              href={value.file}
              download={value.file}
            >
              <span>Yuklab olish</span>
              <MdFileDownload style={{ fontSize: "18px" }} />
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Employees;
