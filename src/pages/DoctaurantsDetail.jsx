import style from "./Doctaurants.module.css";
import { useParams, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

function DoctaurantsDetail() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const { id } = useParams();
  const location = useLocation(); // useLocation orqali state ni olish

  const doctaurantData = location.state; // navigate orqali kelgan obyekt
  console.log(doctaurantData, "doctaurantData");

  return (
    <div className={style.wrapper}>
      <div className={style.cardDetail}>
        <div className={style.detailUserImg}>
          <img
            src={doctaurantData?.file}
            alt={doctaurantData?.[`title_${lang}`]}
          />
        </div>

        <div>
          <p>{doctaurantData?.[`title_${lang}`]}</p>
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
