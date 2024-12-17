import axios from "axios";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import PageTop from "../components/PageTop/PageTop";

export const Requirements = ({ setLoading, loading }) => {
  const [talablarData, setTalablarData] = useState([]);
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  useEffect(() => {
    const fetchData = async () => {
      try {
        await axios
          .get("/kutobxona/talablar/")
          .then((req) => setTalablarData(req.data));
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
      <PageTop data={{ h2: "requirements" }} />

      {talablarData?.map((item) => {
        return (
          <div className="container" key={item?.id}>
            <div className="section-slice">
              <div className="row1">
                <h2>{item?.[`title_${lang}`]}</h2>
                <img src={item?.img_url} alt="" />
              </div>
              <div className="row2">
                <p
                  dangerouslySetInnerHTML={{
                    __html: item?.[`content_${lang}`],
                  }}
                />
                <p
                  dangerouslySetInnerHTML={{
                    __html: item?.[`sub_content_${lang}`],
                  }}
                />
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
};

Requirements.propTypes = {
  setLoading: PropTypes.func,
  loading: PropTypes.any,
};
