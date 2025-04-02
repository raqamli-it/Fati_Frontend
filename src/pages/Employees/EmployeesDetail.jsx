import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";
import style from "./employees.module.css";
import { FaArrowLeftLong } from "react-icons/fa6";
import { FaChevronDown } from "react-icons/fa";
import zIndex from "@mui/material/styles/zIndex";

function EmployeesDetail() {
  const { detail } = useParams();
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const [dataDetail, setDataDetail] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`/markazlar-bolimlar/Xodimlar/${detail}`)
      .then((response) => setDataDetail(response.data)) // ✅ To‘g‘ri versiya
      .catch((error) => console.error("Xatolik:", error));
  }, [detail]);

  console.log(dataDetail, "detail xxx");

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 90) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={style.container}>
      <button
        style={{
          position: isScrolled && "fixed",
          top: isScrolled && "80px",
          zIndex: "9999",
        }}
        title="Sahifadan chiqish"
        className={style["back-button"]}
        onClick={() => navigate(-1)}
      >
        <FaArrowLeftLong fontSize={"22px"} />
        Sahifadan chiqish
      </button>

      <div
        style={{
          display: isScrolled ? "grid" : "grid",
          gridTemplateColumns: isScrolled ? "350px 920px" : "350px 920px",
        }}
        className={style.cardDetails}
      >
        <div
          style={{
            position: isScrolled && "fixed",
            top: isScrolled && "126px",
            width: isScrolled && "350px",
          }}
        >
          <div className={style.imgDetail}>
            <img
              src={dataDetail.image}
              alt={dataDetail?.[`ful_name_${lang}`]}
            />
            <h1>{dataDetail?.[`full_name_${lang}`]}</h1>

            <div className={style["user-details"]}>
              <span>Lavozimi :</span>
              <span>{dataDetail?.[`position_${lang}`]}</span>
            </div>

            <div className={style["user-details"]}>
              <span>Unvoni :</span>
              <span>{dataDetail?.[`degree_${lang}`]}</span>
            </div>

            <div className={style["user-details"]}>
              <span>Raqami :</span>
              <span>{dataDetail?.phone}</span>
            </div>

            <div className={style["user-details"]}>
              <span>Emaili :</span>
              <span>{dataDetail?.email}</span>
            </div>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className={style.toggleBtn}
          >
            <span>Asarlari va maqolalari</span>
            <FaChevronDown
              className={isOpen ? style.rotateIconY : style.rotateIcon}
            />
          </button>
        </div>

        <div
          className={style.cardDetail}
          style={{
            width: isScrolled && "920px",
            marginTop: isScrolled && "48px",
            marginLeft: isScrolled && "380px",
          }}
        >
          <div className={style.scrollBox}>
            <div
              dangerouslySetInnerHTML={{
                __html: dataDetail?.[`about_${lang}`],
              }}
            ></div>

            {isOpen && (
              <div
                // className={`${style.closeText} ${isOpen ? style.openText : ""}`}
                dangerouslySetInnerHTML={{
                  __html: dataDetail?.[`works_${lang}`],
                }}
              ></div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeesDetail;
