import styles from "./newsabout.module.css";
import { useTranslation } from "react-i18next";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { month } from "../News/News";

export const NewsAbout = ({ setLoading, loading }) => {
  const { t, i18n } = useTranslation();
  const [data, setData] = useState({});
  const [newsData, setNewsData] = useState([]);
  const { id } = useParams();
  const lang = i18n.language;

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        await axios
          .get("/qoshimcha-malumotlar/yangiliklar/" + id)
          .then((req) => setData(req.data));
        await axios
          .get("/qoshimcha-malumotlar/yangiliklar/")
          .then((req) => setNewsData(req.data.results));
        setLoading(false);
      } catch (error) {
        setLoading("show-p");
      }
    };
    fetchData();
  }, [id]);
  if (loading === "show-p") {
    return <p className="show-p-error">{t("show-p-error")}</p>;
  }
  if (loading === true) {
    return <div className="loader"></div>;
  }
  return (
    <section className={styles.section}>
      <div className={styles.card}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <h2>{data?.[`title_${lang}`]}</h2>
          <button
            style={{
              padding: "7px 18px",
              borderRadius: "12px",
              border: "none",
              border: "2px solid #808080cd",
              fontSize: "16px",
              cursor: "pointer",
              transition: "all .5s ease-in-out",
              boxShadow:
                "inset 10px 10px 20px rgba(244, 11, 11, 0.83), inset -10px -10px 20px rgba(244, 11, 11, 0.83)",
            }}
            onClick={() => navigate("/news")}
          >
            qaytish
          </button>
        </div>
        <span>
          {data?.created_at?.slice(8, 10) +
            " " +
            month[data?.created_at?.slice(5, 7) + "_" + lang] +
            " " +
            data?.created_at?.slice(0, 4)}
        </span>

        <div className={styles.img}>
          <img src={data?.file} alt="img" />
        </div>

        <ul dangerouslySetInnerHTML={{ __html: data?.[`content_${lang}`] }} />

        <div className={styles.container}>
          <div className={styles["img-cards"]}>
            <h2>{t("latest_news")}</h2>
            <div className={styles.cards}>
              {newsData?.reverse()?.map((item, index) => {
                if (index < 3 && item?.id != id) {
                  return (
                    <Link
                      to={"/news/" + item?.id}
                      className={styles.link}
                      key={item?.id}
                    >
                      <img src={item?.file} alt="book" />
                      {/* <h3>{item?.[`title_${lang}`]}</h3> */}
                      <br />
                      <p
                        dangerouslySetInnerHTML={{
                          __html:
                            item?.[`content_${lang}`]?.slice(0, 250) + "...",
                        }}
                      />
                      {/* <div className={styles.arrow}>
                        <img src="/assets/icons/arrow.svg " alt="arrow img" />
                      </div> */}
                    </Link>
                  );
                }
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
