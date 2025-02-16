import { useTranslation } from "react-i18next";
import styles from "./home.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick/lib/slider";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import HomeNews from "../HomeNews/HomeNews";
import dateFormat from "dateformat";
import { GiCloudDownload } from "react-icons/gi";
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { IoLogoInstagram } from "react-icons/io5";
import { FaExternalLinkAlt } from "react-icons/fa";
import { AiOutlineLink } from "react-icons/ai";
// iconkalar
import avtoreferat from "./kutubxonaIcon/avtoreferat.png";
import elektronkitoblar from "./kutubxonaIcon/elektronkitoblar.png";
import manbalar from "./kutubxonaIcon/manbalar.png";

import { Zoom } from "react-awesome-reveal";
import bgImage from "./bg.jpg";

const headerSettings = {
  fade: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  waitForAnimate: false,
  autoplay: true,
  autoplaySpeed: 6000,
};

export const Home = ({ setLoading, loading }) => {
  const { t, i18n } = useTranslation();
  const [doctaurantsData, setDoctaurantsData] = useState([]);
  const [newsData, setNewsData] = useState([]);
  const [quickLinksData, setQuickLinksData] = useState([]);
  const [centersData, setCentersData] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [sliderData, setSliderData] = useState([]);
  const [langVal] = useState("uz");
  const [seminar, setSeminarData] = useState([]);

  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const lang = i18n.language;

  useEffect(() => {
    i18n.changeLanguage(langVal);
    localStorage.setItem("i18lng", langVal);
  }, [langVal]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        await axios
          .get("/doktarantura/doktarantura/")
          .then((req) => setDoctaurantsData(req.data));
        await axios
          .get("/qoshimcha-malumotlar/karusel/")
          .then((req) => setSliderData(req.data));
        await axios
          .get("/qoshimcha-malumotlar/yangiliklar/")
          .then((req) => setNewsData(req.data));
        await axios
          .get("/qoshimcha-malumotlar/havolalar/")
          .then((req) => setQuickLinksData(req.data));
        await axios
          .get("/markazlar-bolimlar/markazlar-list")
          .then((req) => setCentersData(req.data));

        await axios
          .get("/markazlar-bolimlar/bolimlar-list")
          .then((req) => setTeachers(req.data));

        await axios
          .get("/seminar/seminar-turlari/")
          .then((req) => setSeminarData(req.data));

        await axios
          .get("/qoshimcha-malumotlar/institut-tarixi/")
          .then((req) => setData(req.data.results));
        setLoading(false);
      } catch (error) {
        setLoading("show-p");
      }
    };
    fetchData();
  }, []);

  const booksData = [
    {
      id: 1,
      title: "Avtoreferatlar",
      icon: avtoreferat,
      toLink: "/abstracts",
      text: "Ushbu bo‘limda dissertatsiya avtoreferatlari jamlangan bo‘lib, tarix fanining turli yo‘nalishlari bo‘yicha olib borilgan ilmiy tadqiqotlar bilan tanishishingiz mumkin. Bu materiallar tadqiqotchilar, talaba va ilmiy izlanish olib boruvchilar uchun muhim manba hisoblanadi",
    },
    {
      id: 2,
      title: "Elektron kitoblar",
      icon: elektronkitoblar,
      toLink: "/elektrone",
      text: "Elektron kutubxonamizda tarixiy tadqiqotlar, ilmiy monografiyalar va nodir manbalar to‘plangan. Siz bu yerda turli davrlarga oid akademik asarlar bilan tanishib, ilmiy izlanishlaringiz uchun foydali ma’lumotlarni topishingiz mumkin",
    },

    {
      id: 3,
      title: "Manbalar",
      icon: manbalar,
      toLink: "/e-books",
      text: "Ushbu bo‘limda tarixiy manbalar, arxiv hujjatlari va tadqiqotlar uchun muhim materiallar to‘plangan. Ilmiy izlanishlar uchun zarur bo‘lgan barcha manbalarni topishingiz mumkin",
    },
  ];

  return (
    <section>
      <header className={styles.header}>
        <Slider {...headerSettings} className="slides">
          {sliderData?.map((item, index) => {
            return <div key={index}>{<img src={item?.file} />}</div>;
          })}
        </Slider>
      </header>

      <div className={styles.container}>
        <HomeNews newsData={newsData} />

        <div className="img-cards">
          <h2>{t("centers")}</h2>

          <div className="markaz_va_bolim">
            <div className="markazButton">
              {centersData.map((item, index) => {
                return (
                  <button
                    key={index}
                    onClick={() =>
                      navigate(`/centers-and-departments/markaz/${item.id}`)
                    }
                  >
                    {item?.[`title_${lang}`]}
                  </button>
                );
              })}
            </div>

            <div className="bolimButton">
              {teachers.map((item, index) => {
                return (
                  <button
                    key={index}
                    onClick={() =>
                      navigate(`/centers-and-departments/bolim/${item.id}`)
                    }
                  >
                    {item?.[`title_${lang}`]}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="img-cards">
          <h2>{t("councils")}</h2>
          <ul>
            <li className="no-border">
              <Link to={"scientific-degree"}>
                <p>{t("scientific-degree")}</p>
                <img src="./assets/icons/arrow.svg" alt="arrow" />
              </Link>
            </li>
            <li className="no-border">
              <Link to={"scientific-degree"}>
                <p> {t("sc-young")}</p>
                <img src="./assets/icons/arrow.svg" alt="arrow" />
              </Link>
            </li>
            <li className="no-border">
              <Link to={"scientific-degree"}>
                <p> {t("sc-council")}</p>
                <img src="./assets/icons/arrow.svg" alt="arrow" />
              </Link>
            </li>
          </ul>
        </div>

        <div className="img-cards">
          <h2>{t("doctaurants")}</h2>
          <div className={styles["home-card"]}>
            {doctaurantsData?.slice(-4).map((item, index) => {
              return (
                <Zoom
                  key={index}
                  cascade
                  delay={300 * index}
                  duration={1000}
                  triggerOnce
                >
                  <div className={styles.wrapper}>
                    <div className={styles.homeimg}>
                      <img src={item?.file} alt="user" />
                    </div>

                    <div className={styles.contentTitle}>
                      <h2 key={item.id}>
                        {item?.[`title_${lang}`]?.toLowerCase()}
                      </h2>
                      {/* <p>{item?.type}</p> */}

                      <div className={styles["social-links"]}>
                        <a href="">
                          <FaFacebookF style={{ color: "#0463fa" }} />
                        </a>
                        <a href="">
                          <FaTwitter style={{ color: "#0463fa" }} />
                        </a>
                        <a href="">
                          <IoLogoInstagram style={{ color: "#0463fa" }} />
                        </a>
                      </div>
                    </div>
                  </div>
                </Zoom>
              );
            })}
          </div>
        </div>

        <div
          style={{
            margin: "70px 0",
            height: "400px",
            backgroundImage: `url(${bgImage})`,
            backgroundSize: "cover",
            backgroundPosition: "bottom",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div
            style={{ maxWidth: "1320px", margin: "0 auto", padding: "35px 0" }}
          >
            <h2
              style={{
                fontSize: "36px",
                fontFamily: "Poppins,sans-serf",
                color: "white",
              }}
            >
              {t("gatherings")}
            </h2>
            <div className="yiginlar">
              {seminar?.map((item, index) => {
                return (
                  <div key={index} className="card-yiginlar">
                    <div>
                      <p>{item?.[`title_${lang}`]}</p>
                      <p></p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="img-cards">
          <h2>{t("library")}</h2>
          <div className="card-list">
            {booksData?.map((item, index) => (
              <div className="card-container" key={index}>
                <Link className="link" to={item.toLink}>
                  <img src={item?.icon} alt="Book" />
                  <p>{item.title}</p>
                </Link>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="img-cards">
          <h2>Foydali havolalar</h2>
          <div className="hovolalar">
            {quickLinksData?.map((item, index) => {
              return (
                <div className="link-card" key={index}>
                  <img className="img" src={item?.file} alt="quick link" />
                  <p>{item?.[`title_${lang}`]}</p>
                  <a className="site-path" href={item?.link} target="_blank">
                    <AiOutlineLink />
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
