import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useTranslation } from "react-i18next";
import "./journalDetail.css";

export const JournalDetail = () => {
  const { id } = useParams(); // URL'dan id olish
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const [journalData, setJournalData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchJournalDetail = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/kutobxona/arxiv/${id}/`);
        setJournalData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching journal detail:", error);
        setLoading(false);
      }
    };
    fetchJournalDetail();
  }, [id]);

  if (loading) {
    return <div className="loader"></div>;
  }

  if (!journalData) {
    return <p>{t("no_data")}</p>;
  }

  return (
    <section className="journal-detail">
      <div className="container">
        <div className="journal-detail-header">
          <div className="journal-detail-info">
            <img
              src={journalData?.image}
              alt="Journal"
              className="journal-detail-image"
            />
            <div className="journal-title">
              <div>
                <h2>{journalData[`title_${lang}`]}</h2>
                <p>
                  {journalData.yil} ({journalData.nashr_raqami})
                </p>
              </div>
              <button
                className="journal-Button-x"
                onClick={() => navigate("/journal")}
              >
                Ortga
              </button>
            </div>
            {/* Contentni HTML teglari bilan ishlash uchun dangerouslySetInnerHTML ishlatilmoqda */}
          </div>
          <div
            className="journal-detail-content"
            dangerouslySetInnerHTML={{ __html: journalData[`content_${lang}`] }}
          />
        </div>
      </div>
    </section>
  );
};
