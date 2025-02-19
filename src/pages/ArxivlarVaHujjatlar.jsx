import { useParams } from "react-router-dom";
import { AiOutlineRead } from "react-icons/ai";
import axios from "axios";
import { useEffect, useState } from "react";
import avtorefaratlar from "./ArxivlarVaHujjatlar.module.css";
import { useTranslation } from "react-i18next";
import ReactPaginate from "react-paginate";
import nodata from "../../public/assets/no-data.png";

const ArxivlarVaHujjatlar = () => {
  const { i18n, t } = useTranslation();
  const lang = i18n.language;
  const { arxivlarVaHujjatlarId } = useParams();

  const [filterArxivlar, setFilterArxivlar] = useState([]);
  const [search, setSearch] = useState("");
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const getArxivFunction = async (search, Id = 1) => {
    try {
      const arxivlarFilter = await axios.get(
        `/kutobxona/arxivlar/?search=${search}&page=${Id}`
      );

      setFilterArxivlar(arxivlarFilter.data.results);
      setPageCount(Math.ceil(arxivlarFilter.data.count / 10));
    } catch (error) {
      console.error("Matbuot ma'lumotlarini olishda xatolik:", error);
    }
  };

  useEffect(() => {
    getArxivFunction(search, currentPage);
  }, [search, currentPage]);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected + 1);
  };

  // Books search
  const BooksSearch = (value) => {
    setSearch(value.target.value);
  };
  // Books search

  return (
    <div className={avtorefaratlar.container}>
      <div>
        <input
          type="search"
          placeholder="Search ..."
          onChange={BooksSearch}
          className={avtorefaratlar.searchInput}
        />
      </div>

      <div>
        {filterArxivlar.length > 0 ? (
          <div>
            <div className={avtorefaratlar.imgContainer}>
              {filterArxivlar.map((img, index) => (
                <div key={index} className={avtorefaratlar.card}>
                  <div className={avtorefaratlar.img}>
                    <img src={img.image} alt={img[`title_${lang}`]} />
                    <a
                      href={img.file}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <AiOutlineRead style={{ fontSize: "30px" }} />
                    </a>
                  </div>
                  <p>{img?.[`title_${lang}`]}</p>
                </div>
              ))}
            </div>

            <ReactPaginate
              previousLabel={"←"}
              nextLabel={"→"}
              breakLabel={"..."}
              pageCount={pageCount} // Jami sahifalar soni
              marginPagesDisplayed={2}
              pageRangeDisplayed={3}
              onPageChange={handlePageClick} // Sahifa almashganda
              containerClassName={avtorefaratlar.pagination}
              activeClassName={avtorefaratlar.active}
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
};

export default ArxivlarVaHujjatlar;
