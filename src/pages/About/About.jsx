import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import axios from "axios";
import style from "./about.module.css";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

export const About = ({ loading, setLoading }) => {
  const { t, i18n } = useTranslation();
  const [data, setData] = useState([]);
  const [staff, setStaff] = useState([]);
  const [activePage, setActivePage] = useState(null);
  const lang = i18n.language;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "/qoshimcha-malumotlar/institut-tarixi/"
        );
        const respon = await axios.get(
          "/qoshimcha-malumotlar/xodimlar-turlari/"
        );
        setData(response.data);
        setStaff(respon.data);
      } catch (error) {
        console.error("API fetch error:", error);
        setLoading("show-p");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (staff.length > 0) {
      setActivePage(staff[0]?.id);
    }
  }, [staff]);

  if (loading === "show-p") {
    return <p className="show-p-error">{t("show-p-error")}</p>;
  }

  if (loading === true) {
    return <div className="loader"></div>;
  }

  const FindId = staff.find((val) => val.id === Number(activePage)) || null;

  console.log(FindId, "FindId");

  return (
    <section className={style.about}>
      <FaArrowLeftLong
        title="Orqaga qaytish"
        onClick={() => navigate("/")}
        style={{
          fontSize: "30px",
          color: "blue",
          cursor: "pointer",
          margin: "80px 0 15px",
        }}
      />
      <div>
        {data
          ?.sort((a, b) => b.order - a.order)
          .map((item, index) => (
            <div key={index} className={style.card}>
              <img src={item.image} alt={item.name || "Rasm"} />

              <p className={style.text}>{item?.[`title_${lang}`]}</p>

              <p
                className={style.instituttarixi}
                dangerouslySetInnerHTML={{ __html: item?.[`content_${lang}`] }}
              ></p>
            </div>
          ))}
      </div>

      <div className={style.wrapper}>
        <div className={style.btns}>
          {staff.map((value) => (
            <button
              key={value.id}
              onClick={() => setActivePage(value.id)}
              className={activePage === value.id ? style.active : ""}
            >
              {value?.[`title_${lang}`]}
            </button>
          ))}
        </div>

        <div className={style.details}>
          {FindId &&
            FindId.category.map((item) => (
              <div key={item.id}>
                <div className={style.img}>
                  <img src={item?.image} alt={item?.[`full_name_${lang}`]} />
                </div>
                <p>{item?.[`full_name_${lang}`]}</p>
                <p>{item?.year}</p>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};
