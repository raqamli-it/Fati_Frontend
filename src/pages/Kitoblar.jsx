import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import axios from "axios";
import { FaDownload } from "react-icons/fa";
import "./EBooks.css";
import tab_bg from "./tab_bg.png";
import "./Elektrone.css";
import { useParams, useSearchParams } from "react-router-dom";
import ReactPaginate from "react-paginate";

function Kitoblar({ setLoading, loading }) {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const { kitoblarId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(
    Number(searchParams.get("page")) || 1
  );
  const [pageCount, setPageCount] = useState(0);

  const fetchData = async (page = 1) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `/kutobxona/category/${kitoblarId}/?page=${page}`
      );
      // const category = response.data.filter(
      //   (value) => value.id === Number(elektroneId)
      // );

      setData(response?.data?.avtoreferatlar?.results || []);
      setCurrentPage(page);
      setPageCount(Math.ceil(response?.data?.avtoreferatlar?.count / 10));

      setLoading(false);
    } catch (error) {
      setLoading("show-p");
    }
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage, kitoblarId]);

  const handlePageClick = (event) => {
    const selectedPage = event.selected + 1;
    setSearchParams({ page: selectedPage });
    setCurrentPage(selectedPage);
  };

  if (loading === "show-p") {
    return <p className="show-p-error">{t("show-p-error")}</p>;
  }

  if (loading === true) {
    return <div className="loader"></div>;
  }

  console.log(data, "salom elektronlar kitobi");

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
          {data.length > 0 ? (
            data.map((value, index) => (
              <div key={index} className="wrapper">
                <div className="file">
                  <img src={`${value.image}`} alt="Book" />
                  {value.file && (
                    <a href={`${value.file}`} download={value.id}>
                      <FaDownload />
                    </a>
                  )}
                </div>
                <span className="title_lang">{value?.[`title_${lang}`]}</span>
              </div>
            ))
          ) : (
            <p>{t("No books found")}</p>
          )}
        </div>

        {pageCount > 1 && (
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
        )}
      </div>
    </section>
  );
}

export default Kitoblar;
