import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";
import style from "./tradeunion.module.css";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

export const TradeUnion = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/qoshimcha-malumotlar/rahbariyat/");
        setTeamMembers(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Xatolik:", error);
        setError("Ma'lumotlarni yuklashda xatolik yuz berdi.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Yuklanmoqda...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className={style.tradeUnion}>
      {teamMembers && <div className={style.chiziq}></div>}

      <div className={style.tradeUnionContainer}>
        <div className={style.prevIcon}>
          <FaArrowLeftLong
            title="Orqaga qaytish"
            onClick={() => navigate("/")}
            style={{ fontSize: "30px", color: "blue", cursor: "pointer" }}
          />
          <h1>Institut boshqaruvi</h1>
        </div>
        <div className={style["team-grid"]}>
          {teamMembers?.map((value, index) => (
            <div key={index} className={`${style.card}`}>
              <div className={style["team-member"]}>
                <img src={value.image} alt={value.title_uz} />
              </div>
              <h2>{value?.[`title_${lang}`]}</h2>
              <p>{value.position}</p>
              <p>{value.degree}</p>
              <p>{value.contact}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
