import PropTypes from "prop-types";
import PageTop from "../components/PageTop/PageTop";
import { useEffect, useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";

export const GlobalProjects = ({ setLoading, loading }) => {
  const [data, setData] = useState([]);
  const [isCompleted, setIsCompleted] = useState(true); // Bajarilgan loyihalar yoki amaldagi loyihalar
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/xalqaro-aloqalar/xamkor-loihalar/");
        setData(response.data);
        setLoading(false);
      } catch (error) {
        setLoading("show-p");
      }
    };
    fetchData();
  }, [setLoading]);

  if (loading === "show-p") {
    return <p className="show-p-error">{t("show-p-error")}</p>;
  }
  if (loading === true) {
    return <div className="loader"></div>;
  }

  // Loyihalarni status bo'yicha filtrlash
  const filteredProjects = data?.filter(
    (item) =>
      (isCompleted && item.status === "published") ||
      (!isCompleted && item.status === "not_published")
  );

  return (
    <section>
      <PageTop data={{ h2: "global-projects" }} />
      {/* <div className="container">
        <div className="section-slice">
          <div className="row1 column">
            <h2>{data?.[0]?.[`title_${lang}`]}</h2>
            <img src={data?.[0]?.img_file} alt="Project Image" />
          </div>
          <div className="row2">
            <p
              dangerouslySetInnerHTML={{
                __html: data?.[0]?.[`content_${lang}`],
              }}
            />
          </div>
        </div>
      </div> */}
      <div className="container">
        <div className="global-researchers">
          <div className="top">
            <ul>
              <li
                onClick={() => setIsCompleted(true)}
                className={isCompleted ? "active" : ""}
              >
                {t("completed_projects")} {/* Bajarilgan loyihalar */}
              </li>
              <li
                onClick={() => setIsCompleted(false)}
                className={!isCompleted ? "active" : ""}
              >
                {t("active_projects")} {/* Amaldagi loyihalar */}
              </li>
            </ul>
          </div>
          <ul>
            {filteredProjects?.map((item) => (
              <li
                key={item.id}
                style={{ width: "100%", display: "flex", flexWrap: "wrap" }}
                className="fd"
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "20%",
                  }}
                >
                  <h2 style={{ flex: "1" }}>{item?.[`title_${lang}`]}</h2>
                  <img
                    src={item.img_file}
                    style={{ width: "200px", marginTop: "15px" }}
                    alt="Project Image"
                  />
                </div>
                <p
                  dangerouslySetInnerHTML={{
                    __html: item?.[`content_${lang}`],
                  }}
                  style={{ flex: "2" }}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

GlobalProjects.propTypes = {
  setLoading: PropTypes.func.isRequired,
  loading: PropTypes.any.isRequired,
};
