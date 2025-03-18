import { useEffect, useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import styles from "./Doctaurants.module.css";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";

export const Doctaurants = ({ loading, setLoading }) => {
  const [data, setData] = useState([]);
  const { t, i18n } = useTranslation();
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const lang = i18n.language;
  const navigate = useNavigate();

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
    console.log(event, "xa xato chiqayabdimi");
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

  console.log(data, "Doctaurants");

  return (
    <div className={styles.wrapper}>
      <button
        className={styles["back-button"]}
        title="Sahifadan chiqish"
        onClick={() => navigate("/")}
      >
        <FaArrowLeftLong
          style={{
            fontSize: "24px",
            color: "blue",
            cursor: "pointer",
          }}
        />
        Sahifadan chiqish
      </button>

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
              <button
                onClick={() => navigate(`${item.id}`, { state: item })}
                title="Batafsil ko'rish"
              >
                Batafsil
              </button>
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
