import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import axios from "axios";
import { FaDownload } from "react-icons/fa";
import "./EBooks.css";
import tab_bg from "./tab_bg.png";
import "./Elektrone.css";

function Elektrone({ setLoading, loading }) {
  const { t, i18n } = useTranslation();
  const [data, setData] = useState([]);
  const lang = i18n.language;

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/kutobxona/avtoreferat/");
      const category = response.data.results.filter(
        (value) => value.category == 2
      );
      setData(category);

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading("show-p");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading === "show-p") {
    return <p className="show-p-error">{t("show-p-error")}</p>;
  }
  if (loading === true) {
    return <div className="loader"></div>;
  }

  return (
    <section
      style={{
        backgroundImage: `url(${tab_bg})`,
        width: "100%",
        height: "100%",
        backgroundAttachment: "fixed",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <div className="books">
        <div className="img-download">
          {data?.map((value, index) => (
            <div key={index} className="wrapper">
              <div className="file">
                <img src={value.image} alt="salom" />
                <a href={value.file} download={value.id}>
                  <FaDownload />
                </a>
              </div>

              <span className="title_lang">{value?.[`title_${lang}`]}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Elektrone;
