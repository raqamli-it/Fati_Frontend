import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";
import style from "./Views.module.css";

function Views({ setLoading }) {
  const [data, setData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const { i18n } = useTranslation();
  const lang = i18n.language;

  const getViewsData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/markazlar-bolimlar/video/`);
      setData(response.data);

      if (response.data.length > 0) {
        setSelectedItem(response.data[0]); // Birinchi videoni tanlash
      }
    } catch (error) {
      console.log(error, "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getViewsData();
  }, []);

  console.log(data, "video");

  return (
    <div className={style.container}>
      <div className={style.wrapper}>
        {selectedItem && (
          <div>
            {/* <video
              key={selectedItem.id} // ID yoki boshqa unikal qiymat ishlatish
              controls
              style={{ width: "100%", height: "100%" }}
            >
              <source src={selectedItem.video} type="video/mp4" />
            </video> */}

            <iframe
              key={selectedItem.id}
              width="100%"
              src={selectedItem.link ? selectedItem.link : selectedItem.video} // YouTube `embed` link bo'lishi kerak
              title="Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        )}

        <div className={style.viewsBtn}>
          {data
            ?.sort((a, b) => b.order - a.order)
            .map((item, index) => (
              <div key={index} className={style.viewsCard}>
                <button onClick={() => setSelectedItem(item)}>
                  <img src={item?.image} alt={item?.[`title_${lang}`]} />
                  <span>{item?.[`title_${lang}`]}</span>
                </button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Views;
