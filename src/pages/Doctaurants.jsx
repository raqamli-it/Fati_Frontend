import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import styles from "./Doctaurants.module.css";
import ReactPaginate from "react-paginate";

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
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const lang = i18n.language;

  const fetchData = async (Page = 1) => {
    try {
      setLoading(true);
      await axios
        .get(`/doktarantura/doktarantura/?page=${Page}`)
        .then((req) => {
          setPageCount(Math.ceil(req.data.count / 6));
          setData(req.data.results);
        });
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading("show-p");
    }
  };

  const handlePageClick = (event) => {
    setCurrentPage(event.selected + 1);
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  if (loading === "show-p") {
    return <p className="show-p-error">{t("show-p-error")}</p>;
  }
  if (loading === true) {
    return <div className="loader"></div>;
  }

  return (
    <div className={styles.wrapper}>
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

      <ReactPaginate
        previousLabel={"←"}
        nextLabel={"→"}
        breakLabel={"..."}
        pageCount={pageCount} // Sahifa soni
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={handlePageClick} // Sahifa almashganda
        containerClassName={styles.pagination} // To‘g‘ri class
        activeClassName={styles.active}
        forcePage={currentPage - 1}
      />
    </div>
  );
};
