/* eslint-disable react-hooks/exhaustive-deps */
import { useTranslation } from "react-i18next";
import PageTop from "../../components/PageTop/PageTop";
import styles from "./contact.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { CiLocationOn } from "react-icons/ci";
import { FaMailBulk, FaPhone } from "react-icons/fa";

export const Contact = ({ setLoading, loading }) => {
  const { t } = useTranslation();
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        await axios
          .get("/qoshimcha-malumotlar/aloqa/")
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
    <section className={styles.section}>
      <PageTop data={{ h2: "contact" }} />
      <div className="container">
        <div className="section-slice">
          <div className="row1">
            <h2>{t("contact")}</h2>
          </div>
          <div className="row2">
            <ol>
              <li className="icon-li">
                <b>
                  <CiLocationOn />
                  {t("address")}
                </b>
                <p>{data?.[0]?.adress}</p>
              </li>
              <li className="icon-li">
                <b>
                  <FaPhone />
                  {t("phone")}
                </b>
                <p>{data?.[0]?.phone}</p>
              </li>
              <li className="icon-li">
                <b>
                  <FaMailBulk />
                  {t("email")}
                </b>
                <p>{data?.[0]?.email}</p>
              </li>
            </ol>
          </div>
        </div>
      </div>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d11988.423207249718!2d69.2865385!3d41.3065619!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8ad515a743d3%3A0x39f0e8ce7ec381ea!2sO&#39;zbekiston%20Respublikasi%20Fanlar%20akademiyasi!5e0!3m2!1suz!2s!4v1730127802141!5m2!1suz!2s"
        style={{ width: "100vw", height: "450px" }}
        allowfullscreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </section>
  );
};

Contact.propTypes = {
  setLoading: PropTypes.func,
  loading: PropTypes.any,
};
