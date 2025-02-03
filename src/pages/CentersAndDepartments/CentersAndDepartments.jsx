import styles from "./centers-and-departments.module.css";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import axios from "axios";

export const CentersAndDepartments = ({ setLoading, loading }) => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        await axios
          .get("/markazlar-va-bolimlar/markazlar_bolimlar/")
          .then((req) => setData(req.data));
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

  console.log(data, "XXXXX");

  return <section className={styles.section}></section>;
};
