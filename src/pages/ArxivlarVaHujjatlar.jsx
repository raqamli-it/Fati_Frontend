

import { useParams } from "react-router-dom";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { AiOutlineRead } from "react-icons/ai";
import axios from "axios";
import { useEffect, useState } from "react";
import arxivlar from "./ArxivlarVaHujjatlar.module.css";

const ArxivlarVaHujjatlar = () => {
  const { arxivlarVaHujjatlarId } = useParams();
  const [categories, setCategories] = useState([]);
  const [years, setYears] = useState([]);
  const [regions, setRegions] = useState([]);
  const [images, setImages] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState([]);

  const getMatbuotFunction = async () => {
    try {
      const response = await axios.get("/kutobxona/archive_documents/list/");
      const imagesRes = await axios.get("/kutobxona/archive_documents/filter/");
      setCategories(response.data || []);
      setYears(response.data || []);
      // setRegions(response.data.regions || []);
      setImages(imagesRes.data.results || []);
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

  console.log(images, "images");
  console.log(categories, "categories");
  console.log(years, "years");

  return (
    <div className={arxivlar.container}>
      <div>
        <input
          type="text"
          placeholder="Search ..."
          className={arxivlar.searchInput}
        />
        {[
          { label: "Categories", data: categories },
          // { label: "Years", data: years },
          // { label: "Regions", data: regions },
        ].map((section, index) => (
          <Accordion key={index} style={{ margin: 0, padding: "10px" }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              style={{ backgroundColor: "#80808070" }}
            >
              <Typography>{section.label}</Typography>
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
                    className={arxivlar["custom-checkbox"]}
                  />
                </Typography>
              ))}
            </AccordionDetails>
          </Accordion>
        ))}
      </div>

      <div className={arxivlar.imgContainer}>
        {images?.map((img, index) => (
          <div key={index} className={arxivlar.card}>
            <div className={arxivlar.img}>
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

export default ArxivlarVaHujjatlar;

// import { useTranslation } from "react-i18next";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { FaDownload } from "react-icons/fa";
// import arxiv from "./ArxivlarVaHujjatlar.module.css";
// import tab_bg from "./tab_bg.png";
// import { useParams } from "react-router-dom";
// import ReactPaginate from "react-paginate";

// export const ArxivlarVaHujjatlar = ({ setLoading, loading }) => {
//   const { t, i18n } = useTranslation();
//   const [data, setData] = useState([]);
//   const [pageCount, setPageCount] = useState(0);
//   const [currentPage, setCurrentPage] = useState(1);
//   const lang = i18n.language;
//   const { arxivlarVaHujjatlarId } = useParams();

//   const fetchData = async (page = 1) => {
//     try {
//       setLoading(true);
//       const response = await axios.get(
//         `/kutobxona/category/${arxivlarVaHujjatlarId}/?page=${page}`
//       );
//       const booksData = response?.data?.avtoreferatlar;

//       setData(booksData?.results);
//       setPageCount(Math.ceil(booksData?.count / 10));
//       setLoading(false);
//     } catch (error) {
//       console.log(error);
//       setLoading("show-p");
//     }
//   };

//   useEffect(() => {
//     fetchData(currentPage);
//   }, [currentPage, arxivlarVaHujjatlarId]);

//   const handlePageClick = (event) => {
//     setCurrentPage(event.selected + 1);
//   };

//   if (loading === "show-p") {
//     return <p className="show-p-error">{t("show-p-error")}</p>;
//   }
//   if (loading === true) {
//     return <div className="loader"></div>;
//   }

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
//       <div className={arxiv.books}>
//         <div className={arxiv["img-download"]}>
//           {data?.map((value, index) => (
//             <div key={index} className={arxiv.wrapper}>
//               <div className={arxiv.file}>
//                 <img src={value.image} alt="salom" />
//                 <a href={value.file} download={value.id}>
//                   <FaDownload />
//                 </a>
//               </div>

//               <span className={arxiv.title_lang}>
//                 {value?.[`title_${lang}`]}
//               </span>
//             </div>
//           ))}
//         </div>

//         <ReactPaginate
//           previousLabel={"←"}
//           nextLabel={"→"}
//           breakLabel={"..."}
//           pageCount={pageCount}
//           marginPagesDisplayed={2}
//           pageRangeDisplayed={3}
//           onPageChange={handlePageClick}
//           breakClassName={"pagination-break"} // "..." uchun class
//           containerClassName={"pagination"} // Umumiy class
//           pageClassName={"page-item"} // Har bir raqam uchun class
//           pageLinkClassName={"page-link"} // Har bir link uchun
//           activeClassName={"active"} // Tanlangan sahifa uchun
//           previousClassName={"pagination-prev"} // Oldingi tugma uchun
//           nextClassName={"pagination-next"} // Keyingi tugma uchun
//         />
//       </div>
//     </section>
//   );
// };
