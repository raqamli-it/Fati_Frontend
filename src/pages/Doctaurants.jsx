import { useEffect, useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import styles from "./Doctaurants.module.css";
import ReactPaginate from "react-paginate";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";

export const Doctaurants = ({ loading, setLoading }) => {
  const [data, setData] = useState([]);
  const { t, i18n } = useTranslation();
  const [pageCount, setPageCount] = useState(0);
  const lang = i18n.language;
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  // Query dan page qiymatini olish, bo'lmasa default 1
  const currentPage = parseInt(searchParams.get("page")) || 1;

  const fetchData = async (Page = 1) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `/doktarantura/doktarantura/?page=${Page}`
      );
      setPageCount(Math.ceil(response.data.count / 6));
      setData(response.data.results);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading("show-p");
    }
  };

  const handlePageClick = (event) => {
    const selectedPage = event.selected + 1;
    setSearchParams({ page: selectedPage }); // URL ga yozib qo'yamiz
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
      <button
        className={styles["back-button"]}
        title="Sahifadan chiqish"
        onClick={() => navigate("/")}
      >
        <FaArrowLeftLong
          style={{ fontSize: "24px", color: "blue", cursor: "pointer" }}
        />
        Sahifadan chiqish
      </button>

      <section className={styles.cards}>
        {data.map((item, index) => (
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
        ))}
      </section>

      <ReactPaginate
        previousLabel={"←"}
        nextLabel={"→"}
        breakLabel={"..."}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={handlePageClick}
        containerClassName={styles.pagination}
        activeClassName={styles.active}
        forcePage={currentPage - 1} // react-paginate 0-indeksda ishlaydi
      />
    </div>
  );
};
