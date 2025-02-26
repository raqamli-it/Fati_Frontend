import { AiOutlineRead } from "react-icons/ai";
import axios from "axios";
import { useEffect, useState } from "react";
import adabiyotlar from "./Adabiyotlar.module.css";
import { useTranslation } from "react-i18next";
import ReactPaginate from "react-paginate";
import { FcSearch } from "react-icons/fc";
import nodata from "../../public/assets/no-data.png";

const Adabiyotlar = () => {
  const { i18n, t } = useTranslation();
  const lang = i18n.language;

  const [filterAdabiyotlar, setFilterAdabiyotlar] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [tempSearch, setTempSearch] = useState("");

  const getAdabiyotlarFunction = async (Page = 1, query = "") => {
    try {
      const response = await axios.get(
        `/kutobxona/adabiyotlar/?search=${query}&page=${Page}`
      );

      setFilterAdabiyotlar(response.data.results);
      setPageCount(Math.ceil(response.data.count / 3)); // Har sahifada 10 ta element bor deb faraz qilamiz
    } catch (error) {
      console.error("Kitoblarni olishda xatolik:", error);
    }
  };

  useEffect(() => {
    getAdabiyotlarFunction(currentPage, search);
  }, [currentPage]);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected + 1);
  };

  // Icon bosilganda qidiruv boshlanadi
  const BooksSearch = () => {
    setSearch(tempSearch); // Yangi qidiruv so‘zini belgilaymiz
    getAdabiyotlarFunction(1, tempSearch); // Backendga so‘rov yuboramiz
    setCurrentPage(1); // 1-sahifadan boshlash
  };

  return (
    <div className={adabiyotlar.container}>
      <div
        style={{ position: "relative", display: "inline-block", width: "50%" }}
      >
        <input
          type="text"
          placeholder="Search ..."
          value={tempSearch}
          onChange={(e) => setTempSearch(e.target.value)}
          className={adabiyotlar.searchInput}
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
        {filterAdabiyotlar.length > 0 ? (
          <div>
            <div className={adabiyotlar.imgContainer}>
              {filterAdabiyotlar?.map((img, index) => {
                return (
                  <div key={index} className={adabiyotlar.card}>
                    <div className={adabiyotlar.img}>
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
                );
              })}
            </div>
            <ReactPaginate
              previousLabel={"←"}
              nextLabel={"→"}
              breakLabel={"..."}
              pageCount={pageCount} // Jami sahifalar soni
              marginPagesDisplayed={2}
              pageRangeDisplayed={3}
              onPageChange={handlePageClick} // Sahifa almashganda
              containerClassName={adabiyotlar.pagination}
              activeClassName={adabiyotlar.active}
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

export default Adabiyotlar;
