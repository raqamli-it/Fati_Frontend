import React, { useEffect, useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import style from "./Notices.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";

function NoticesDetail({ setLoading, loading }) {
  const [data, setData] = useState(null);
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/kengashlar/elonlar/${id}/`); // Faqat bitta e'lonni olish
        setData(response.data);
      } catch (error) {
        setLoading("show-p");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading === "show-p") {
    return <p className="show-p-error">{t("show-p-error")}</p>;
  }

  if (loading) {
    return <div className="loader"></div>;
  }

  console.log(data, "data");

  return (
    <div className={style.detailContainer}>
      <div className={style.detailContainer}>
        {data ? (
          <div>
            <button
              title="Saxifadan chiqish"
              onClick={() => navigate(-1)}
              style={{
                display: "flex",
                gap: "15px",
                marginRight: "auto",
                alignItems: "center",
                marginLeft: 0,
                marginBottom: "15px",
              }}
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
            <h2 className={style["about-title"]}>{data[`title_${lang}`]}</h2>

            <div
              style={{
                float: "left",
                width: "25%",
                marginRight: "20px",
              }}
            >
              <img
                style={{ width: "100%" }}
                src={data.image}
                alt="Detail Image"
              />
            </div>

            <div
              className={style.detailText}
              dangerouslySetInnerHTML={{ __html: data[`content_${lang}`] }}
            ></div>
          </div>
        ) : (
          <p>{t("data_not_found")}</p>
        )}
      </div>
    </div>
  );
}

export default NoticesDetail;
