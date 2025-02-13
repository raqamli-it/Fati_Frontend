import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import axios from "axios";
import { FaDownload } from "react-icons/fa";
import "./EBooks.css";
import tab_bg from "./tab_bg.png";
import { useParams } from "react-router-dom";
import ReactPaginate from "react-paginate";

export const ArxivlarVaHujjatlar = ({ setLoading, loading }) => {
  const { t, i18n } = useTranslation();
  const [data, setData] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const lang = i18n.language;
  const { arxivlarVaHujjatlarId } = useParams();

  const fetchData = async (page = 1) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `/kutobxona/category/${arxivlarVaHujjatlarId}/?page=${page}`
      );
      const booksData = response?.data?.avtoreferatlar;

      setData(booksData?.results);
      setPageCount(Math.ceil(booksData?.count / 10));
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading("show-p");
    }
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage, arxivlarVaHujjatlarId]);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected + 1);
  };

  if (loading === "show-p") {
    return <p className="show-p-error">{t("show-p-error")}</p>;
  }
  if (loading === true) {
    return <div className="loader"></div>;
  }

  return (
    <section
      style={{
        backgroundImage: `url(${tab_bg})`,
        width: "100%",
        height: "100%",
        backgroundAttachment: "fixed",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <div className="books">
        <div className="img-download">
          {data?.map((value, index) => (
            <div key={index} className="wrapper">
              <div className="file">
                <img src={value.image} alt="salom" />
                <a href={value.file} download={value.id}>
                  <FaDownload />
                </a>
              </div>

              <span className="title_lang">{value?.[`title_${lang}`]}</span>
            </div>
          ))}
        </div>

        <ReactPaginate
          previousLabel={"←"}
          nextLabel={"→"}
          breakLabel={"..."}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={3}
          onPageChange={handlePageClick}
          breakClassName={"pagination-break"} // "..." uchun class
          containerClassName={"pagination"} // Umumiy class
          pageClassName={"page-item"} // Har bir raqam uchun class
          pageLinkClassName={"page-link"} // Har bir link uchun
          activeClassName={"active"} // Tanlangan sahifa uchun
          previousClassName={"pagination-prev"} // Oldingi tugma uchun
          nextClassName={"pagination-next"} // Keyingi tugma uchun
        />
      </div>
    </section>
  );
};
