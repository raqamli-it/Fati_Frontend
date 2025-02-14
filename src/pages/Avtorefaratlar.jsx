import { useParams } from "react-router-dom";
import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import avtorefaratlar from "./Avtorefaratlar.module.css";
import { AiOutlineRead } from "react-icons/ai";

const Avtorefaratlar = () => {
  const { avtorefaratlarId } = useParams();

  const data = [
    {
      id: 1,
      title: "Category",
      innerData: [
        { id: 1, text: "Category 1" },
        { id: 2, text: "Category 2" },
        { id: 3, text: "Category 3" },
      ],
    },

    // {
    //   id: 2,
    //   title: "Year",
    //   innerData: [
    //     { id: 1, text: "Year 1" },
    //     { id: 2, text: "Year 2" },
    //     { id: 3, text: "Year 3" },
    //     { id: 4, text: "Year 4" },
    //     { id: 5, text: "Year 5" },
    //   ],
    // },

    // {
    //   id: 3,
    //   title: "Region",
    //   innerData: [
    //     { id: 1, text: "Region 1" },
    //     { id: 2, text: "Region 2" },
    //     { id: 3, text: "Region 3" },
    //   ],
    // },
  ];

  const FilterData = (id) => {
    console.log(id);
  };

  return (
    <div className={avtorefaratlar.container}>
      <div>
        <input
          type="text"
          placeholder="Search ..."
          className={avtorefaratlar.searchInput}
        />

        {data.map((value) => (
          <Accordion key={value.id} style={{ margin: 0, padding: "10px" }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              style={{ backgroundColor: "#80808070" }}
            >
              <Typography>{value.title}</Typography>
            </AccordionSummary>

            <AccordionDetails>
              {value.innerData.map((innerValue, innerIndex) => (
                <Typography
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    margin: "10px 20px",
                    color: "#000000d0",
                  }}
                  key={innerIndex}
                >
                  <span style={{ fontSize: "16px", fontWeight: "500" }}>
                    {innerValue.text}
                  </span>
                  <input
                    onChange={() => FilterData(innerValue.id)}
                    type="checkbox"
                    className={avtorefaratlar["custom-checkbox"]}
                  />
                </Typography>
              ))}
            </AccordionDetails>
          </Accordion>
        ))}
      </div>

      <div className={avtorefaratlar.imgContainer}>
        {data?.map((img, index) => (
          <div key={index} className={avtorefaratlar.card}>
            <div className={avtorefaratlar.img}>
              <img src={img.images} alt={img.title} />
              <a href={`${img.id}`}>
                <AiOutlineRead style={{ fontSize: "30px" }} />
              </a>
            </div>

            <p>{img.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Avtorefaratlar;

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
