import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";
import style from "./Tahririyat.module.css";
import ReactPaginate from "react-paginate";

function Tahririyat() {
  // Tahririyat get jarayon qismi
  const [tahririyat, setTahririyat] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  const TahririyatGet = async (Id = 1) => {
    try {
      const tahririyatPagination = await axios.get(
        `/kutobxona/tahririyat/?page=${Id}`
      );
      setTahririyat(tahririyatPagination?.data.results);
      setPageCount(Math.ceil(tahririyatPagination.data.count / 3));
    } catch (error) {}
  };

  // const lang = i18n.language;

  useEffect(() => {
    TahririyatGet(currentPage);
  }, [currentPage]);

  // Tahririyat get jarayon qismi

  const handlePageClick = (event) => {
    setCurrentPage(event.selected + 1);
  };

  console.log(tahririyat, "tahririyat");

  return (
    <div className={style.tahririyat}>
      <div className={style["tahririyat-wrapper"]}>
        {tahririyat?.map((value, index) => (
          <div key={index} className={style.wrapper}>
            <div className={style["img-tahririyat"]}>
              <img src={value?.file} alt="img" />
              <p>
                {value?.[`degree_${lang}`]} {value?.[`sphere_${lang}`]}
              </p>
            </div>

            <div className={style.description}>
              <p className={style.title}>
                {value?.[`position_${lang}`]} : {value?.[`title_${lang}`]}
              </p>
            </div>
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
        containerClassName={style.pagination}
        activeClassName={style.active}
      />
    </div>
  );
}

export default Tahririyat;
