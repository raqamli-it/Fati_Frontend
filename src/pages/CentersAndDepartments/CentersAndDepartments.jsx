import styles from "./centers-and-departments.module.css";
import PageTop from "../../components/PageTop/PageTop";
import { Link, useParams } from "react-router-dom";
import Slider from "../../components/Slider";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";

export const CentersAndDepartments = ({ setLoading, loading }) => {
  const { id } = useParams();
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        await axios
          .get("/markazlar-va-bolimlar/markazlar_bolimlar/" + id)
          .then((req) => setData(req.data));
        setLoading(false);
      } catch (error) {
        setLoading("show-p");
      }
    };
    fetchData();
  }, [id, setLoading]);

  if (loading === "show-p") {
    return <p className="show-p-error">{t("show-p-error")}</p>;
  }
  if (loading === true) {
    return <div className="loader"></div>;
  }

  return (
    <section className={styles.section}>
      <PageTop data={{ h2: data?.[`title_${lang}`] }} />
      <div className="container">
        <ul className="c-links">
          <li>
            <a href={"#history"}>{t("history")}</a>
          </li>
          <li>
            <a href={"#staff"}>{t("staff")}</a>
          </li>

          <li>
            <a href={"#gallery"}>{t("gallery")}</a>
          </li>
        </ul>
      </div>
      <Slider slideData={data.rasmlar?.filter((item) => item.silder)} />
      <div className="container" id="history">
        <div className="section-slice">
          <div className="row1">
            <h2>{t("history")}</h2>
          </div>
          <div className="row2">
            <p dangerouslySetInnerHTML={{ __html: data?.[`tarix_${lang}`] }} />
          </div>
        </div>
      </div>
      <div className="container" id="staff">
        <div className="community">
          <h2 className="title">{t("staff")}</h2>
          <div className="cards">
            {data?.xodimlar?.map((item) => (
              <div className="card" key={item.id}>
                <div className="content">
                  <p>{item?.[`lavozim_${lang}`]}</p>
                  <h2>{item?.[`name_${lang}`]}</h2>
                  <span>{item?.[`ilmiy_daraja_${lang}`]}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="container" id="gallery">
        <div className="img-cards" style={{ marginTop: "70px" }}>
          <h2>{t("gallery")}</h2>
          <div className="cards">
            {data?.rasmlar?.map((item) =>
              item.fotogalereya ? (
                <div className="card" key={item.id}>
                  <img src={item?.fotogalereya} alt="not found" />
                </div>
              ) : (
                ""
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

CentersAndDepartments.propTypes = {
  setLoading: PropTypes.func,
  loading: PropTypes.any,
};
