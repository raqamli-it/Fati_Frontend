import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import PageTop from "../components/PageTop/PageTop";
import { useEffect, useState } from "react";
import axios from "axios";

export const InternationalTravels = ({ loading, setLoading }) => {
  const [data, setData] = useState([]);
  const { t, i18n } = useTranslation();

  const lang = i18n.language;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        await axios
          .get("/xalqaro-aloqalar/xalqaro-sayohatlar/")
          .then((req) => setData(req.data.results));
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
      <PageTop data={{ h2: "travels" }} />
      {data?.map((item) => (
        <div className="container" key={item?.id}>
          <div className="section-slice">
            <div className="row1">
              <h2>{item?.[`title_${lang}`]}</h2>
              <img src={item?.file} alt="" />
            </div>
            <div className="row2">
              <p
                dangerouslySetInnerHTML={{ __html: item?.[`content_${lang}`] }}
              />
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

InternationalTravels.propTypes = {
  setLoading: PropTypes.func,
  loading: PropTypes.any,
};
