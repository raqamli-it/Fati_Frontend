import styles from "./newsabout.module.css";
import { useTranslation } from "react-i18next";
import { Link, useNavigate, useParams } from "react-router-dom";
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
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <h2>
            <IoArrowBack
              style={{ cursor: "pointer", color: "#000000ad" }}
              onClick={() => navigate(-1)}
            />
            {data?.[`title_${lang}`]}
          </h2>

          <span>
            {data?.created_at?.slice(8, 10) +
              " " +
              month[data?.created_at?.slice(5, 7) + "_" + lang] +
              " " +
              data?.created_at?.slice(0, 4)}
          </span>
        </div>
        <div className={styles.img}>
          <img src={data?.image} alt="img" />
        </div>
        <ul dangerouslySetInnerHTML={{ __html: data?.[`content_${lang}`] }} />
      </div>
    </section>
  );
};
