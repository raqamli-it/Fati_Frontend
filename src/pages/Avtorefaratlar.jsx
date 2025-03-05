import { useParams } from "react-router-dom";
import { AiOutlineRead } from "react-icons/ai";
import axios from "axios";
import { useEffect, useState } from "react";
import avtorefaratlar from "./Avtorefaratlar.module.css";
import ReactPaginate from "react-paginate";
import { useTranslation } from "react-i18next";
import { FcSearch } from "react-icons/fc";
import nodata from "../../public/assets/no-data.png";

const Avtorefaratlar = () => {
  const { i18n, t } = useTranslation();
  const lang = i18n.language;

  const [filterAvtoreferat, setFilterAvtoreferat] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [tempSearch, setTempSearch] = useState("");

  const getAvtorefaratlarFunction = async (search = "", Page = 1) => {
    try {
      const avtoreferatFilter = await axios.get(
        `/kutobxona/avtoreferat/?search=${search}&page=${Page}`
      );
      setFilterAvtoreferat(avtoreferatFilter.data.results);
      setPageCount(Math.ceil(avtoreferatFilter.data.count / 16));
    } catch (error) {
      console.error("Matbuot ma'lumotlarini olishda xatolik:", error);
    }
  };

  useEffect(() => {
    getAvtorefaratlarFunction(search, currentPage);
  }, [search, currentPage]);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected + 1);
  };

  // Books search
  const BooksSearch = () => {
    setSearch(tempSearch);
    getAvtorefaratlarFunction(tempSearch, 1);
    setCurrentPage(1);
  };
  // Books search

  return (
    <div className={avtorefaratlar.container}>
      <div
        style={{ position: "relative", display: "inline-block", width: "50%" }}
      >
        <input
          type="text"
          placeholder="Qidiruv ..."
          value={tempSearch}
          onChange={(e) => setTempSearch(e.target.value)}
          className={avtorefaratlar.searchInput}
        />

        <FcSearch
          onClick={BooksSearch}
          style={{
            fontSize: "30px",
            position: "absolute",
            right: "10px",
            cursor: "pointer",
            top: "10px",
          }}
        />
      </div>

      <div>
        {filterAvtoreferat.length > 0 ? (
          <div>
            <div className={avtorefaratlar.imgContainer}>
              {filterAvtoreferat.map((img, index) => (
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
              marginPagesDisplayed={1}
              pageRangeDisplayed={2}
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

export default Avtorefaratlar;
