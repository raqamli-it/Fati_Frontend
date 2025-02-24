import { useEffect, useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import style from "./GlobalProjects.module.css";

export const GlobalProjects = ({ setLoading, loading }) => {
  const [data, setData] = useState([]);
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  const [activePage, setActivePage] = useState("Amaldagi loyihalar");

  const ActiveButton = (id) => {
    console.log("Bosilgan ID:", id);
    setActivePage(id);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/xalqaro-aloqalar/xamkor-loihalar/");
        setData(response.data);
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

  const mapData = data.find(
    (value) => value.status.trim() === activePage.trim()
  );

  console.log(data);

  return (
    <div className={style.globalProjects}>
      <div className={style.findPage}>
        {data?.map((item, index) => (
          <button
            className={`${
              item.status.trim() === activePage.trim()
                ? style.activeButton
                : style.button
            }`}
            onClick={() => ActiveButton(item.status)}
            key={index}
          >
            {item.status}
          </button>
        ))}
      </div>

      <div>
        <div className={style.card}>
          {/* <img src={mapData.img_file} alt={mapData?.[`title_${lang}`]} /> */}

          <h3>{mapData?.[`title_${lang}`]}</h3>
          <div
            className={style.table}
            dangerouslySetInnerHTML={{
              __html: mapData?.[`content_${lang}`],
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};
