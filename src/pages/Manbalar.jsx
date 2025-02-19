import { useParams } from "react-router-dom";
import { AiOutlineRead } from "react-icons/ai";
import axios from "axios";
import { useEffect, useState } from "react";
import adabiyotlar from "./Adabiyotlar.module.css";
import { useTranslation } from "react-i18next";
import ReactPaginate from "react-paginate";
import nodata from "../../public/assets/no-data.png";

const Manbalar = () => {
  const { i18n, t } = useTranslation();
  const lang = i18n.language;
  const { manbalarId } = useParams();
  const [filterManbalar, setFilterManbalar] = useState([]);
  const [search, setSearch] = useState("");
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const getManbalarFunction = async (books = "", Id = 1) => {
    try {
      const manbalarFilter = await axios.get(
        `/kutobxona/manbalar/?search=${books}&page=${Id}`
      );
      setFilterManbalar(manbalarFilter.data.results);
      setPageCount(Math.ceil(manbalarFilter.data.count / 10));
    } catch (error) {
      console.error("Matbuot ma'lumotlarini olishda xatolik:", error);
    }
  };

  useEffect(() => {
    getManbalarFunction(search, currentPage);
  }, [search, currentPage]);

  // Books search
  const BooksSearch = (value) => {
    setSearch(value.target.value);
  };
  // Books search

  const handlePageClick = (event) => {
    setCurrentPage(event.selected + 1);
  };

  return (
    <div className={adabiyotlar.container}>
      <div>
        <input
          type="search"
          placeholder="Search ..."
          onChange={BooksSearch}
          className={adabiyotlar.searchInput}
        />
      </div>

      <div>
        {filterManbalar.length > 0 ? (
          <div>
            <div className={adabiyotlar.imgContainer}>
              {filterManbalar.map((img, index) => (
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

export default Manbalar;

// import { useTranslation } from "react-i18next";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { FaDownload } from "react-icons/fa";
// import "./EBooks.css";
// import tab_bg from "./tab_bg.png";
// import { useParams } from "react-router-dom";
// import ReactPaginate from "react-paginate";

// export const Avtorefaratlar = ({ setLoading, loading }) => {
//   const { t, i18n } = useTranslation();
//   const [data, setData] = useState([]);
//   const [pageCount, setPageCount] = useState(0);
//   const [currentPage, setCurrentPage] = useState(1);
//   const lang = i18n.language;
//   const { avtorefaratlarId } = useParams();

//   const fetchData = async (page = 1) => {
//     try {
//       setLoading(true);
//       const response = await axios.get(
//         `/kutobxona/category/${avtorefaratlarId}/?page=${page}`
//       );

//       setData(response?.data?.avtoreferatlar?.results);
//       setPageCount(Math.ceil(response?.data?.avtoreferatlar?.count / 10));

//       setLoading(false);
//     } catch (error) {
//       console.log(error);
//       setLoading("show-p");
//     }
//   };

//   useEffect(() => {
//     fetchData(currentPage);
//   }, [currentPage, avtorefaratlarId]);

//   const handlePageClick = (event) => {
//     const selectedPage = event.selected + 1;
//     setCurrentPage(selectedPage);
//     fetchData(selectedPage); // Yangi sahifani yuklash
//   };

//   if (loading === "show-p") {
//     return <p className="show-p-error">{t("show-p-error")}</p>;
//   }
//   if (loading === true) {
//     return <div className="loader"></div>;
//   }

//   console.log(data, "xaxaxa");

//   return (
//     <section
//       style={{
//         backgroundImage: `url(${tab_bg})`,
//         width: "100%",
//         height: "100%",
//         backgroundAttachment: "fixed",
//         backgroundRepeat: "no-repeat",
//         backgroundPosition: "center",
//         backgroundSize: "cover",
//       }}
//     >
//       <div className="books">
//         <div className="img-download">
//           {data?.map((value, index) => (
//             <div key={index} className="wrapper">
//               <div className="file">
//                 <img src={value.image} alt="salom" />
//                 <a href={value.file} download={value.id}>
//                   <FaDownload />
//                 </a>
//               </div>
//               <span className="title_lang">{value?.[`title_${lang}`]}</span>
//             </div>
//           ))}
//         </div>
//         {data && (
//           <ReactPaginate
//             previousLabel={"←"}
//             nextLabel={"→"}
//             breakLabel={"..."}
//             pageCount={pageCount}
//             marginPagesDisplayed={2}
//             pageRangeDisplayed={3}
//             onPageChange={handlePageClick}
//             breakClassName={"pagination-break"} // "..." uchun class
//             containerClassName={"pagination"} // Umumiy class
//             pageClassName={"page-item"} // Har bir raqam uchun class
//             pageLinkClassName={"page-link"} // Har bir link uchun
//             activeClassName={"active"} // Tanlangan sahifa uchun
//             previousClassName={"pagination-prev"} // Oldingi tugma uchun
//             nextClassName={"pagination-next"} // Keyingi tugma uchun
//           />
//         )}
//       </div>
//     </section>
//   );
// };
