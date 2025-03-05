import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";
import style from "./Arxiv.module.css";
import ReactPaginate from "react-paginate";
import { FcDownload, FcSearch } from "react-icons/fc";
import nodata from "../../../public/assets/no-data.png";

function Arxiv() {
  // Arxiv get jarayon qismi
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  const [arxiv, setArxiv] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState(""); // Asosiy qidiruv matni
  const [tempSearch, setTempSearch] = useState(""); // Inputga yoziladigan vaqtinchalik qidiruv

  const GetArxiv = async (Page = 1, query = "") => {
    try {
      const response = await axios.get(
        `/kutobxona/arxivlar/?search=${query}&page=${Page}`
      );
      setArxiv(response?.data.results);
      setPageCount(Math.ceil(response.data.count / 10));
    } catch (error) {
      console.error("Arxivlardan ma'lumotlarini olishda xatolik:", error);
    }
  };

  useEffect(() => {
    GetArxiv(currentPage, search); // Faqat sahifa o'zgarsa so'rov yuboriladi
  }, [currentPage]);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected + 1);
  };

  // Icon bosilganda qidiruv boshlanadi
  const BooksSearch = () => {
    setSearch(tempSearch); // Yangi qidiruv so‘zini belgilaymiz
    GetArxiv(1, tempSearch); // Backendga so‘rov yuboramiz
    setCurrentPage(1); // 1-sahifadan boshlash
  };

  const handleOpenPDF = (pdfUrl) => {
    window.open(pdfUrl, "_blank", "noopener,noreferrer");
  };

  console.log(arxiv, "arxiv");

  return (
    <div className={style.tahririyat}>
      <div
        style={{ position: "relative", display: "inline-block", width: "32%" }}
      >
        <input
          type="text"
          placeholder="Qidiruv ..."
          value={tempSearch} // Inputni `tempSearch` bilan bog‘laymiz
          onChange={(e) => setTempSearch(e.target.value)} // Vaqtinchalik searchni yangilash
          className={style.searchInput}
        />
        <FcSearch
          onClick={BooksSearch}
          style={{
            fontSize: "30px",
            position: "absolute",
            right: "10px",
            cursor: "pointer",
            top: "38%",
            transform: "translateY(-50%)",
          }}
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
                      style={{ cursor: "pointer" }}
                      onClick={() => handleOpenPDF(value.file)}
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
              alt="No data"
              style={{
                width: "35%",
                height: "300px",
                margin: "25px auto 0",
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
