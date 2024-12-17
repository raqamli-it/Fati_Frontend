import { BiDownArrow, BiUpArrow } from "react-icons/bi";
import PageTop from "../components/PageTop/PageTop";
import { FaSearch } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import axios from "axios";
import PropTypes from "prop-types";

export const EBooks = ({ setLoading, loading }) => {
  const { t, i18n } = useTranslation();
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 20;
  const lang = i18n.language;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/kutobxona/elektronKitob/");
        setData(response.data.results);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading("show-p");
      }
    };
    fetchData();
  }, []);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  const filteredData = data.filter((item) =>
    item?.[`title_${lang}`]?.toLowerCase()?.includes(search.toLowerCase())
  );

  const pageCount = Math.ceil(filteredData.length / itemsPerPage);
  const displayData = filteredData.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  if (loading === "show-p") {
    return <p className="show-p-error">{t("show-p-error")}</p>;
  }
  if (loading === true) {
    return <div className="loader"></div>;
  }

  return (
    <section>
      <PageTop data={{ h2: "e-books" }} />
      <div className="books">
        <div className="container">
          <div className="top">
            <h2>{t("e-books")}</h2>
            <label>
              <input
                type="text"
                placeholder={t("search")}
                onInput={(e) => setSearch(e.target.value)}
              />
              <FaSearch />
            </label>
          </div>
        </div>
        <div className="container">
          <div className="img-cards">
            <div className="cards">
              {displayData.map((item) => (
                <div className="card" key={item?.id}>
                  <img src={item?.cover_img} alt="book img" />
                  <h3>{item?.[`title_${lang}`]}</h3>
                  <a href={item?.file} target="_blank" className="arrow">
                    <img src="./assets/icons/arrow.svg " alt="arrow img" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
        <ReactPaginate
          previousLabel={<BiUpArrow />}
          nextLabel={<BiDownArrow />}
          pageCount={pageCount}
          onPageChange={handlePageClick}
          containerClassName="pagination"
          previousLinkClassName="pagination__link"
          nextLinkClassName="pagination__link"
          disabledClassName="pagination__link--disabled"
          activeClassName="pagination__link--active"
        />
      </div>
    </section>
  );
};

EBooks.propTypes = {
  setLoading: PropTypes.func,
  loading: PropTypes.any,
};
