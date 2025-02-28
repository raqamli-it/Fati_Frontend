import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import style from "./Notices.module.css";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";

function Notices({ setLoading, loading }) {
  const [data, setData] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const navigate = useNavigate();

  const fetchData = async (Page = 1) => {
    try {
      setLoading(true);
      await axios.get(`/kengashlar/elonlar/?page=${Page}`).then((req) => {
        setPageCount(Math.ceil(req.data.count / 4));
        setData(req.data.results);
      });
      setLoading(false);
    } catch (error) {
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
    <div className={style.container}>
      <div className={style.cards}>
        {data?.map((item, index) => (
          <div className={style.card} key={index}>
            <div className={style.images}>
              <img src={item.image} />
            </div>
            <div className={style.discription}>
              <p>{item?.[`title_${lang}`]}</p>
              <button
                onClick={() => navigate(`${item.id}`)}
                className={style["btn-details"]}
              >
                Batafsil
              </button>
            </div>
          </div>
        ))}
      </div>

      <ReactPaginate
        previousLabel={"←"}
        nextLabel={"→"}
        breakLabel={"..."}
        pageCount={pageCount} // Sahifa soni
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={handlePageClick} // Sahifa almashganda
        containerClassName={style.pagination} // To‘g‘ri class
        activeClassName={style.active}
        forcePage={currentPage - 1}
      />
    </div>
  );
}

export default Notices;
