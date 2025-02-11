import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import styles from "./Doctaurants.module.css";

const Accordion = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef(null);
  return (
    <div className={styles.accordion}>
      <button
        className={styles["accordion-header"]}
        onClick={() => setIsOpen(!isOpen)}
      >
        {title}
        <span className={styles.arrow}>{isOpen ? "▲" : "▼"}</span>
      </button>

      <div
        className={styles["accordion-content"]}
        style={{
          maxHeight: isOpen ? `${contentRef.current?.scrollHeight}px` : "0px",
        }}
      >
        <div ref={contentRef} className={styles["scroll-container"]}>
          <ol
            dangerouslySetInnerHTML={{
              __html: content,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export const Doctaurants = ({ setLoading, loading }) => {
  const [data, setData] = useState([]);
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        await axios
          .get("/doktarantura/doktarantura/")
          .then((req) => setData(req.data.results));
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading("show-p");
      }
    };
    fetchData();
  }, []);
  if (loading === "show-p") {
    return <p className="show-p-error">{t("show-p-error")}</p>;
  }
  if (loading === true) {
    return <div className="loader"></div>;
  }
  return (
    <section className={styles.cards}>
      {data.map((item, index) => {
        return (
          <div className={styles.container} key={index}>
            <img
              src={item?.file}
              alt="image"
              className={styles["card-image"]}
            />
            <h6 className={styles.title}>{item?.[`title_${lang}`]}</h6>
            <Accordion
              title="Mehnat faoliyati"
              content={item?.[`labor_activity_${lang}`]}
            />
            <Accordion
              title="Ilmiy faoliyat"
              content={item?.[`scientific_activity_${lang}`]}
            />
            <Accordion title="Asarlari" content={item?.[`works_${lang}`]} />
          </div>
        );
      })}
    </section>
  );
};
