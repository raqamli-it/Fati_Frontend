import React, { useEffect, useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import style from "./Notices.module.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import ReactPaginate from "react-paginate";

function Notices({ setLoading, loading }) {
  const [data, setData] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  // URL dan sahifa raqamini olish
  const currentPage = Number(searchParams.get("page")) || 1;
  const fetchData = async (Page = 1) => {
    try {
      setLoading(true);
      const response = await axios.get(`/kengashlar/elonlar/?page=${Page}`);
      setPageCount(Math.ceil(response.data.count / 8));
      setData(response.data.results);
      setLoading(false);
    } catch (error) {
      setLoading("show-p");
    }
  };

  const handlePageClick = (event) => {
    const selectedPage = event.selected + 1;
    setSearchParams({ page: selectedPage }); // URL ga saqlash
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

  console.log(data, "data ss");

  return (
    <div className={style.container}>
      <div className={style.cards}>
        {data
          ?.sort((a, b) => b.order - a.order)
          .map((item, index) => (
            <div className={style.card} key={index}>
              <div className={style.images}>
                <img src={item.image} alt={item[`title_${lang}`]} />
              </div>
              <div className={style.discription}>
                <p>{item?.[`title_${lang}`]}</p>
                <button
                  title="Batafsil ko'rish"
                  onClick={() => navigate(`${item.id}?page=${currentPage}`)}
                  className={style["btn-details"]}
                >
                  Batafsil
                </button>
              </div>
            </div>
          ))}
      </div>

      <ReactPaginate
        previousLabel={"<"}
        nextLabel={">"}
        breakLabel={"..."}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={handlePageClick}
        containerClassName={style.pagination}
        activeClassName={style.active}
        forcePage={currentPage - 1}
      />
    </div>
  );
}

export default Notices;
