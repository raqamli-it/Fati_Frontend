import { useParams } from "react-router-dom";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { AiOutlineRead } from "react-icons/ai";
import axios from "axios";
import { useEffect, useState } from "react";
import matbuot from "./Matbuot.module.css";

const Matbuot = () => {
  const { matbuotId } = useParams();
  const [categories, setCategories] = useState([]);
  const [years, setYears] = useState([]);
  const [regions, setRegions] = useState([]);
  const [images, setImages] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState([]);

  const getMatbuotFunction = async () => {
    try {
      const response = await axios.get("/kutobxona/matbuot/list/");
      const imagesRes = await axios.get("/kutobxona/matbuot/filter/");
      setCategories(response.data.mat_categories || []);
      setYears(response.data.years || []);
      setRegions(response.data.regions || []);
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

  return (
    <div className={matbuot.container}>
      <div>
        <input
          type="text"
          placeholder="Search ..."
          className={matbuot.searchInput}
        />
        {[
          { label: "Categories", data: categories },
          { label: "Years", data: years },
          { label: "Regions", data: regions },
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
                    className={matbuot["custom-checkbox"]}
                  />
                </Typography>
              ))}
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
      
      <div className={matbuot.imgContainer}>
        {images?.map((img, index) => (
          <div key={index} className={matbuot.card}>
            <div className={matbuot.img}>
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

export default Matbuot;
