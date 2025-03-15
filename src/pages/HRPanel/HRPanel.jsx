import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import axios from "axios";
import hrpanel from "./HRPanel.module.css";
import kadirlar from "./kadirlar.png";
import { Zoom } from "react-awesome-reveal";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

function HRPanel({ setLoading, loading }) {
  const { t, i18n } = useTranslation();
  const [data, setData] = useState([]);
  const [HRPanel, setHRPanel] = useState("Xodimlar");
  const lang = i18n.language;
  const navigate = useNavigate();

  const GetHRPanel = async () => {
    try {
      setLoading(true);
      await axios
        .get("/qoshimcha-malumotlar/kadirlar-bolimi/")
        .then((req) => setData(req.data));
    } catch (error) {
      console.log(error);
      setLoading("show-p");
    }
  };

  useEffect(() => {
    GetHRPanel();
  }, []);

  const HRPanelBtn = (title) => {
    setHRPanel(title);
  };

  const selectedData = data.find((item) => item.title === HRPanel);

  console.log(HRPanel, "data");

  return (
    <div className={hrpanel.container}>
      <div className={hrpanel["bg-img"]}>
        <img src={kadirlar} alt="kadirlar" />
      </div>

      <div className={hrpanel.wrapper}>
        <div className={hrpanel.btns}>
          <div className={hrpanel.btn}>
            <FaArrowLeftLong
              title="Orqaga qaytish"
              onClick={() => navigate("/")}
              style={{
                fontSize: "30px",
                color: "blue",
                cursor: "pointer",
                height: "80px",
                backgroundColor: "white",
                width: "120px",
                display: "block",
                padding: "20px",
                borderRadius: "16px",
                boxShadow: "0 0 6px gray",
              }}
            />
            {data?.map((value, index) => (
              <button onClick={() => HRPanelBtn(value.title)} key={index}>
                {value.title}
              </button>
            ))}
          </div>
        </div>

        <div className={hrpanel.card}>
          {selectedData?.kadirlar?.map((items, idx) => (
            <div key={idx} className={hrpanel.box}>
              <Zoom cascade>
                <div className={hrpanel.img}>
                  <img src={items.image} alt={items.image} />
                </div>
              </Zoom>
              <div className={hrpanel.description}>
                <p>{items.full_name}</p>
                <p>{items.position}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HRPanel;
