import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import axios from "axios";
import hrpanel from "./HRPanel.module.css";
import kadirlar from "./kadirlar.png";
import { Zoom } from "react-awesome-reveal";

function HRPanel({ setLoading, loading }) {
  const { t, i18n } = useTranslation();
  const [data, setData] = useState([]);
  const [HRPanel, setHRPanel] = useState("Xodimlar");
  const lang = i18n.language;

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

  //   if (loading === "show-p") {
  //     return <p className="show-p-error">{t("show-p-error")}</p>;
  //   }
  //   if (loading === true) {
  //     return <div className="loader"></div>;
  //   }

  console.log(data, "HRPanel");
  console.log(HRPanel, "HRPanel Details");

  return (
    <div className={hrpanel.container}>
      <div className={hrpanel["bg-img"]}>
        <img src={kadirlar} alt="kadirlar" />
      </div>

      <div className={hrpanel.wrapper}>
        <div className={hrpanel.btn}>
          {data?.map((value, index) => (
            <button onClick={() => HRPanelBtn(value.title)} key={index}>
              {value.title}
            </button>
          ))}
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
