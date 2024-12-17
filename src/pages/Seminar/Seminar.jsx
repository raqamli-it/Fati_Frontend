import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import PageTop from "../../components/PageTop/PageTop";
import { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
export const Seminar = ({ setLoading, loading }) => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const { id } = useParams();

  const [data, setData] = useState([]);
  const [isCompleted, setIsCompleted] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        await axios
          .get(`/seminar/seminar-turlari/${id}/`)
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
    <section>
      <PageTop data={{ h2: data?.[`title_${lang}`] }} />
      {/* <div className="container">
          <div className="seminar">
            <h2>{data?.[`title_${lang}`]}</h2>
            <ul
              dangerouslySetInnerHTML={{ __html: data?.[`subcontent_${lang}`] }}
            />
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
                Seminarlar
              </li>
              <li
                onClick={() => setIsCompleted(false)}
                className={!isCompleted ? "active" : ""}
              >
                Seminar majlislari
              </li>
            </ul>
          </div>
          {isCompleted
            ? data?.seminarlar?.map((item) => (
                <ul key={item.id} style={{ padding: "10px" }}>
                  <h2>{item?.[`title_${lang}`]}</h2>
                  <ul
                    dangerouslySetInnerHTML={{
                      __html: item?.[`subcontent_${lang}`],
                    }}
                  />
                </ul>
              ))
            : data?.seminarmajlislar?.map((item) => (
                <ul key={item.id} style={{ padding: "10px" }}>
                  <h2>{item?.[`title_${lang}`]}</h2>

                  <p
                    style={{
                      marginTop: "20px",
                      color: "blueviolet",
                      display: "block",
                      width: "100vw",
                      height: "40px",
                    }}
                  >
                    {item?.data}
                  </p>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: item?.[`content_${lang}`],
                    }}
                    style={{ marginBottom: "40px" }}
                  />
                  <img
                    src={item?.file}
                    alt=""
                    style={{ width: "100%", height: "100%" }}
                  />
                  <p
                    dangerouslySetInnerHTML={{
                      __html: item?.[`subcontent_${lang}`],
                    }}
                    style={{ marginTop: "40px" }}
                  />
                </ul>
              ))}
        </div>
      </div>
    </section>
  );
};

Seminar.propTypes = {
  setLoading: PropTypes.func,
  loading: PropTypes.any,
};
