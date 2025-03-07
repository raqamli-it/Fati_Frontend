import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { FaPlay } from "react-icons/fa6";
import style from "./Listenings.module.css";

function Listenings({ setLoading }) {
  const [data, setData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const { i18n } = useTranslation();
  const lang = i18n.language;

  // ✅ API dan malumot olish
  const getListeningsData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/markazlar-bolimlar/audio/`);
      setData(response.data);
      if (response.data.length > 0) {
        setSelectedItem(response.data[0]);
      }
    } catch (error) {
      console.log(error, "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getListeningsData();
  }, []);

  // ✅ Audio faylning formatini aniqlash
  const getAudioType = (url) => {
    const extension = url.split(".").pop().toLowerCase(); // Fayl kengaytmasini olish
    switch (extension) {
      case "mp3":
        return "audio/mpeg";
      case "wav":
        return "audio/wav";
      case "ogg":
        return "audio/ogg";
      case "m4a":
        return "audio/mp4"; // ✅ TO‘G‘RI FORMAT
      default:
        return "audio/mpeg"; // ✅ Default format
    }
  };

  console.log(selectedItem, "selectedItem");
  console.log(document.createElement("audio").canPlayType("audio/mp4"));

  return (
    <div className={style.container}>
      <div className={style.wrapper}>
        {selectedItem && (
          <div>
            <img
              src={selectedItem.image}
              alt={selectedItem?.[`title_${lang}`]}
            />
            <audio
              key={selectedItem.audio}
              controls
              style={{ width: "100%", marginTop: "15px" }}
            >
              <source
                src={selectedItem.audio}
                type={getAudioType(selectedItem.audio)}
              />
              Sizning brauzeringiz ushbu audio formatni qollab-quvvatlamaydi.
            </audio>
          </div>
        )}

        <div className={style.audioCard}>
          {data.map((item, index) => (
            <div key={index}>
              <button onClick={() => setSelectedItem(item)}>
                <FaPlay
                  style={{
                    fontSize: "25px",
                  }}
                />
                <span>{item?.[`title_${lang}`]}</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Listenings;
