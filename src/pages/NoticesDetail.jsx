import React, { useEffect, useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import style from "./Notices.module.css";
import { useParams } from "react-router-dom";

function NoticesDetail({ setLoading, loading }) {
  const [data, setData] = useState(null);
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const { id } = useParams();

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

  return (
    <div className={style.detailContainer}>
      <div className={style.detailContainer}>
        {data ? (
          <>
            <p>{data[`title_${lang}`]}</p>
            
            <div
              style={{
                float: "left",
                width: "42%",
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
              style={{
                width: "100%",
              }}
              dangerouslySetInnerHTML={{ __html: data[`content_${lang}`] }}
            ></div>
          </>
        ) : (
          <p>{t("data_not_found")}</p>
        )}
      </div>
    </div>
  );
}

export default NoticesDetail;
