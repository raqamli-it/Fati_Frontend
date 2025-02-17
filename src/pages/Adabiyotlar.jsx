import { AiOutlineRead } from "react-icons/ai";
import axios from "axios";
import { useEffect, useState } from "react";
import adabiyotlar from "./Adabiyotlar.module.css";
import { useTranslation } from "react-i18next";
import ReactPaginate from "react-paginate";

const Adabiyotlar = () => {
  const { i18n, t } = useTranslation();
  const lang = i18n.language;

  const [filterAdabiyotlar, setFilterAdabiyotlar] = useState([]);
  const [search, setSearch] = useState("");
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const getAdabiyotlarFunction = async (searchTerm, Id = 1) => {
    try {
      const response = await axios.get(
        `http://backend.fati.uz/kutobxona/arxivlar/?search=${searchTerm}&page=${Id}`
      );
      setFilterAdabiyotlar(response.data.results);

      setPageCount(Math.ceil(response.data.count / 10)); // Har sahifada 10 ta element bor deb faraz qilamiz
    } catch (error) {
      console.error("Kitoblarni olishda xatolik:", error);
    }
  };

  useEffect(() => {
    getAdabiyotlarFunction(search, currentPage);
  }, [search, currentPage]);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected + 1);
  };

  return (
    <div className={adabiyotlar.container}>
      <div>
        <input
          type="search"
          placeholder="Search ..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={adabiyotlar.searchInput}
        />
      </div>

      <div>
        <div className={adabiyotlar.imgContainer}>
          {filterAdabiyotlar.length > 0 ? (
            filterAdabiyotlar.map((img, index) => (
              <div key={index} className={adabiyotlar.card}>
                <div className={adabiyotlar.img}>
                  <img src={img.image} alt={img[`title_${lang}`]} />
                  <a href={img.file} target="_blank" rel="noopener noreferrer">
                    <AiOutlineRead style={{ fontSize: "30px" }} />
                  </a>
                </div>
                <p>{img?.[`title_${lang}`]}</p>
              </div>
            ))
          ) : (
            <p>Ma’lumot topilmadi</p>
          )}
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
    </div>
  );
};

export default Adabiyotlar;
