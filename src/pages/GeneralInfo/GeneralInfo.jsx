import generalInfo from "./generalInfo.module.css";
import { useTranslation } from "react-i18next";

function GeneralInfo({ activeData }) {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  console.log(activeData, "xaqida");

  return (
    <div className={generalInfo.generalInfo}>
      <div className={generalInfo.contants}>
        <h2>{activeData?.[`title_${lang}`]}</h2>
        <div
          dangerouslySetInnerHTML={{
            __html: activeData?.[`content_${lang}`],
          }}
        ></div>
      </div>

      <div className={generalInfo.imgCard}>
        <div className={generalInfo.img}>
          <img src={activeData.image} alt={activeData?.[`title_${lang}`]} />
        </div>

        <div className={generalInfo.contants}>
          <div
            dangerouslySetInnerHTML={{
              __html: activeData?.[`content_two_${lang}`],
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default GeneralInfo;
