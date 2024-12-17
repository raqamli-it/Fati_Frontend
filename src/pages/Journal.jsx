import { useEffect, useState } from "react";
import PageTop from "../components/PageTop/PageTop";
import { useTranslation } from "react-i18next";
import axios from "axios";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./journal.css";

export const Journal = ({ setLoading, loading }) => {
  const [archiveYearVal, setArchiveYear] = useState("2005");
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const [tahrirchilarData, setTahrirchilarData] = useState([]);
  const [archiveMenuData, setArchiveMenuData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        await axios
          .get("/kutobxona/tahrirchilar/")
          .then((req) => setTahrirchilarData(req.data));
        await axios
          .get("/kutobxona/arxiv/")
          .then((req) => setArchiveMenuData(req.data));
        setLoading(false);
      } catch (error) {
        setLoading("show-p");
      }
    };
    fetchData();
  }, []);

  if (loading === "show-p") {
    return <p className="show-p-error">{t("show-p-error")}</p>;
  }

  if (loading === true) {
    return <div className="loader"></div>;
  }

  return (
    <section>
      <PageTop data={{ h2: "journal" }} />
      <div className="container">
        <h2>{t("journal")}</h2>
      </div>

      {/* Tahrirchilar Sektsiyasi */}
      <div className="container jrn">
        <div className="section-slice">
          <div className="row1 column">
            <h2>{t("authors")}</h2>
            <img src="./assets/journal.jpg" alt="book jpg" />
          </div>
          <div className="row2">
            <ul>
              {tahrirchilarData?.map((item) => {
                return (
                  <li key={item?.id} className="author-card">
                    <div className="author-info">
                      <h4>{item?.[`title_${lang}`]}</h4>
                      <span>{item?.lavozimi}</span>
                      <p>{item?.[`ish_joyi`]}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>

      {/* Arxiv Sonlari Sektsiyasi */}
      <div className="container">
        <h2 style={{ marginBottom: "20px" }}>
          <q>{t("journal")}</q> {t("archives")}
        </h2>
      </div>
      <div className="container archive-cards-container">
        {archiveMenuData?.map((item) => (
          <div key={item.id} className="archive-card">
            <h3>{item[`title_${lang}`]}</h3>
            <p>
              {item.yil} ({item.nashr_raqami})
            </p>

            {/* Matnni 100 belgidan keyin kesish */}
            <p
              dangerouslySetInnerHTML={{
                __html:
                  item[`content_${lang}`].length > 100
                    ? `${item[`content_${lang}`].substring(0, 500)}...`
                    : item[`content_${lang}`],
              }}
            />

            <Link to={`/journal/detail/${item.id}`} className="view-more">
              {t("Batafsil korish")} {"->"}
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

Journal.propTypes = {
  setLoading: PropTypes.func,
  loading: PropTypes.any,
};
