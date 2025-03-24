import style from "./Doctaurants.module.css";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FaArrowLeftLong } from "react-icons/fa6";

function DoctaurantsDetail() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const { id } = useParams();
  const location = useLocation(); // useLocation orqali state ni olish
  const navigate = useNavigate();

  const doctaurantData = location.state; // navigate orqali kelgan obyekt
  console.log(doctaurantData, "doctaurantData");

  return (
    <div className={style.wrapper}>
      <button
        className={style["back-button"]}
        title="Saxifadan chiqish"
        onClick={() => navigate(-1)}
      >
        <FaArrowLeftLong
          style={{
            fontSize: "24px",
            color: "blue",
            cursor: "pointer",
          }}
        />
        Saxifadan chiqish
      </button>
      <div className={style.cardDetail}>
        <div className={style.detailUserImg}>
          <img
            src={doctaurantData?.file}
            alt={doctaurantData?.[`title_${lang}`]}
          />
        </div>

        <div>
          <p>{doctaurantData?.[`full_name_${lang}`]}</p>
          <h3
            dangerouslySetInnerHTML={{
              __html: doctaurantData?.[`labor_activity_${lang}`],
            }}
          ></h3>
          <h3
            dangerouslySetInnerHTML={{
              __html: doctaurantData?.[`scientific_activity_${lang}`],
            }}
          ></h3>
          <h3
            dangerouslySetInnerHTML={{
              __html: doctaurantData?.[`works_${lang}`],
            }}
          ></h3>
        </div>
      </div>
    </div>
  );
}

export default DoctaurantsDetail;
