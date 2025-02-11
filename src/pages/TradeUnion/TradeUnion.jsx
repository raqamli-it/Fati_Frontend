import { useEffect, useState } from "react";
import PageTop from "../../components/PageTop/PageTop";
import { useTranslation } from "react-i18next";
import axios from "axios";
import style from "./tradeunion.module.css";

export const TradeUnion = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://backend.fati.uz/qoshimcha-malumotlar/rahbariyat/"
        );
        setTeamMembers(response.data); // Faqat results ni saqlaymiz
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
      <div className={style.chiziq}></div>
      <div className={style.container}>
        <h1>Ilmiy Xodimlar Va Loyiha Qatnashchilari</h1>
        <div className={style["team-grid"]}>
          {teamMembers && teamMembers.length > 0 ? (
            teamMembers.map((member, index) => (
              <Cards key={member.id} data={member} index={index} />
            ))
          ) : (
            <div className={style.photo_def}>
              <img src="/assets/top-bg.png" alt="rasm chiqadi" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Cards = ({ data, index }) => {
  return (
    <div
      className={
        index % 2 === 1 ? style["team-member-t"] : style["team-member-j"]
      }
    >
      <div className={style["team-member"]}>
        <img src={data.image || "/assets/user.jpg"} alt={data.title_uz} />
        <h2>{data.title_uz}</h2>
        <p>{data.position}</p>
        <p>{data.degree}</p>
        <p>{data.contact}</p>
      </div>
    </div>
  );
};
