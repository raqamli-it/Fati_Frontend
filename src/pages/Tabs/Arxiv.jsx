import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";
import style from "./Arxiv.module.css";
import ReactPaginate from "react-paginate";
import { FcDownload } from "react-icons/fc";
import nodata from "../../../public/assets/no-data.png";

function Arxiv() {
  // Arxiv get jarayon qismi
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  const [arxiv, setArxiv] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");

  const GetArxiv = async (Page = 1, books = "") => {
    try {
      const response = await axios.get(
        `/kutobxona/arxivlar/?search=${books}&page=${Page}`
      );
      setArxiv(response?.data.results);
      setPageCount(Math.ceil(response.data.count / 10));
    } catch (error) {
      console.error("Arxivlardan ma'lumotlarini olishda xatolik:", error);
    }
  };

  useEffect(() => {
    GetArxiv(currentPage, search);
  }, [currentPage, search]);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected + 1);
  };

  // Books search
  const BooksSearch = (value) => {
    setSearch(value.target.value);
  };
  // Books search

  return (
    <div className={style.tahririyat}>
      <div>
        <input
          type="search"
          placeholder="Search ..."
          onChange={BooksSearch}
          className={style.searchInput}
        />
      </div>

      <div>
        {arxiv.length > 0 ? (
          <div>
            <div className={style["tahririyat-wrapper"]}>
              {arxiv?.map((value, index) => (
                <div key={index} className={style.wrapper}>
                  <div className={style["img-tahririyat"]}>
                    <img src={value?.image} alt="img" />
                    <a
                      src={value.file}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FcDownload className={style.icon} />
                    </a>
                  </div>

                  <div className={style.description}>
                    <p>{value?.[`title_${lang}`]}</p>
                    <p>{value?.year}</p>
                  </div>
                </div>
              ))}
            </div>

            <ReactPaginate
              previousLabel={"←"}
              nextLabel={"→"}
              breakLabel={"..."}
              pageCount={pageCount} // Jami sahifalar soni
              marginPagesDisplayed={1}
              pageRangeDisplayed={2}
              onPageChange={handlePageClick} // Sahifa almashganda
              containerClassName={style.pagination}
              activeClassName={style.active}
            />
          </div>
        ) : (
          <div>
            <img
              src={nodata}
              alt=""
              style={{
                width: "42%",
                height: "300px",
                margin: "0 auto",
                display: "block",
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Arxiv;
