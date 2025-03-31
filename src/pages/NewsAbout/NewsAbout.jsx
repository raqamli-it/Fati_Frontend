import styles from "./newsabout.module.css";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { month } from "../News/News";
import { IoArrowBack } from "react-icons/io5";

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

  console.log(data, "data");

  return (
    <section className={styles.section}>
      <div className={styles.card}>
        <h2>
          <IoArrowBack
            style={{
              cursor: "pointer",
              color: "#023e8a",
              fontSize: "30px",
            }}
            onClick={() => navigate(-1)}
          />
          <span>{data?.[`title_${lang}`]}</span>
        </h2>

        <div className={styles.img}>
          <img src={data?.image} alt="img" />
        </div>

        <div className={styles.textContent}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              color: "#023e8a",
              fontWeight: "600",
              fontSize: "26px",
              fontFamily: "'Poppins',serif-serf",
              marginBottom: "15px",
            }}
          >
            {data?.created_at?.slice(8, 10) +
              " " +
              month[data?.created_at?.slice(5, 7) + "_" + lang] +
              " " +
              data?.created_at?.slice(0, 4)}
          </div>

          <div
            dangerouslySetInnerHTML={{ __html: data?.[`content_${lang}`] }}
          ></div>
        </div>
      </div>
    </section>
  );
};
