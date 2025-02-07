import React from "react";
import { useTranslation } from "react-i18next";

function ElektroneId({ setLoading, loading }) {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  if (loading === "show-p") {
    return <p className="show-p-error">{t("show-p-error")}</p>;
  }
  if (loading === true) {
    return <div className="loader"></div>;
  }
  return <div>salomat</div>;
}

export default ElektroneId;
