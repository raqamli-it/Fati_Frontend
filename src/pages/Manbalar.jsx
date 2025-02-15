import { useParams } from "react-router-dom";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { AiOutlineRead } from "react-icons/ai";
import axios from "axios";
import { useEffect, useState } from "react";
import kitoblar from "./Kitoblar.module.css";

const Manbalar = () => {
  const { kitoblarId } = useParams();

  const [years, setYears] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [regions, setRegions] = useState([]);

  const [list, setList] = useState([]);
  const [filter, setFilter] = useState([]);

  const getMatbuotFunction = async () => {
    try {
      const bookList = await axios.get("/kutobxona/books/list");
      const bookListFilter = await axios.get("/kutobxona/books/filter/");

      setList(bookList.data);
      setFilter(bookListFilter.data.results);
    } catch (error) {
      console.error("Matbuot ma'lumotlarini olishda xatolik:", error);
    }
  };

  useEffect(() => {
    getMatbuotFunction();
  }, []);

  const handleFilterChange = (id) => {
    setSelectedFilters((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  console.log(list, "list");
  console.log(filter, "filter");

  return (
    <div className={kitoblar.container}>
      <div>
        <input
          type="text"
          placeholder="Search ..."
          className={kitoblar.searchInput}
        />
        {[
          { label: "Categories", data: list },
        ].map((section, index) => (
          <Accordion key={index} style={{ margin: 0, padding: "10px" }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              style={{ backgroundColor: "#80808070" }}
            >
              <Typography>Categories</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {section.data.map((item) => (
                <Typography
                  key={item.id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    margin: "15px 0",
                    color: "#000000d0",
                  }}
                >
                  <span style={{ fontSize: "16px", fontWeight: "500" }}>
                    {item.title_uz}
                  </span>
                  <input
                    type="checkbox"
                    checked={selectedFilters.includes(item.id)}
                    onChange={() => handleFilterChange(item.id)}
                    className={kitoblar["custom-checkbox"]}
                  />
                </Typography>
              ))}
            </AccordionDetails>
          </Accordion>
        ))}
      </div>

      <div className={kitoblar.imgContainer}>
        {filter?.map((img, index) => (
          <div key={index} className={kitoblar.card}>
            <div className={kitoblar.img}>
              <img src={img.image} alt={img.title_uz} />
              <a href={img.file} target="_blank" rel="noopener noreferrer">
                <AiOutlineRead style={{ fontSize: "30px" }} />
              </a>
            </div>
            <p>{img.title_uz}</p>
          </div>
        ))}
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
// import "./Elektrone.css";
// import { useParams, useSearchParams } from "react-router-dom";
// import ReactPaginate from "react-paginate";

// function Kitoblar({ setLoading, loading }) {
//   const { t, i18n } = useTranslation();
//   const lang = i18n.language;
//   const { kitoblarId } = useParams();
//   const [searchParams, setSearchParams] = useSearchParams();

//   const [data, setData] = useState([]);
//   const [currentPage, setCurrentPage] = useState(
//     Number(searchParams.get("page")) || 1
//   );
//   const [pageCount, setPageCount] = useState(0);

//   const fetchData = async (page = 1) => {
//     try {
//       setLoading(true);
//       const response = await axios.get(
//         `/kutobxona/category/${kitoblarId}/?page=${page}`
//       );
//       // const category = response.data.filter(
//       //   (value) => value.id === Number(elektroneId)
//       // );

//       setData(response?.data?.avtoreferatlar?.results || []);
//       setCurrentPage(page);
//       setPageCount(Math.ceil(response?.data?.avtoreferatlar?.count / 10));

//       setLoading(false);
//     } catch (error) {
//       setLoading("show-p");
//     }
//   };

//   useEffect(() => {
//     fetchData(currentPage);
//   }, [currentPage, kitoblarId]);

//   const handlePageClick = (event) => {
//     const selectedPage = event.selected + 1;
//     setSearchParams({ page: selectedPage });
//     setCurrentPage(selectedPage);
//   };

//   if (loading === "show-p") {
//     return <p className="show-p-error">{t("show-p-error")}</p>;
//   }

//   if (loading === true) {
//     return <div className="loader"></div>;
//   }

//   console.log(data, "salom elektronlar kitobi");

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
//           {data.length > 0 ? (
//             data.map((value, index) => (
//               <div key={index} className="wrapper">
//                 <div className="file">
//                   <img src={`${value.image}`} alt="Book" />
//                   {value.file && (
//                     <a href={`${value.file}`} download={value.id}>
//                       <FaDownload />
//                     </a>
//                   )}
//                 </div>
//                 <span className="title_lang">{value?.[`title_${lang}`]}</span>
//               </div>
//             ))
//           ) : (
//             <p>{t("No books found")}</p>
//           )}
//         </div>

//         {pageCount > 1 && (
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
// }

// export default Kitoblar;
