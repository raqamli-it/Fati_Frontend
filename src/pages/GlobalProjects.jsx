import { useEffect, useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import style from "./GlobalProjects.module.css";

export const GlobalProjects = ({ setLoading, loading }) => {
  const [data, setData] = useState([]);
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

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


  return (
    <div className={style.globalProjects}>
      {data.map((item, index) => (
        <div key={index} className={style.card}>
          <img src={item.img_file} alt={item?.[`title_${lang}`]} />
          <h3>{item?.[`title_${lang}`]}</h3>
          <table>
            <tbody>
              <tr>
                <th
                  dangerouslySetInnerHTML={{
                    __html: item?.[`content_${lang}`],
                  }}
                ></th>
              </tr>
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};
