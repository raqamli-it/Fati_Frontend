import { useTranslation } from "react-i18next";
import styles from "./home.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Slider from "react-slick/lib/slider";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import HomeNews from "../HomeNews/HomeNews";
import { Zoom } from "react-awesome-reveal";

// import Slider from "react-slick";
// import { navbarData } from "../../exports/navbar";

// iconkalar
import jurnali from "./kutubxonaIcon/jurnali.jpg";
import manbalar from "./kutubxonaIcon/manbalar.png";
import adabiyotlar from "./kutubxonaIcon/adabiyotlar.jpg";
import avtorefaratlar from "./kutubxonaIcon/avtorefaratlar.jpg";
import bgImage from "./bg.jpg";

import { FaArrowRightLong } from "react-icons/fa6";
import { FaFacebookF, FaTwitter } from "react-icons/fa";
import { IoLogoInstagram } from "react-icons/io5";
import { AiOutlineLink } from "react-icons/ai";
import { GrNext, GrPrevious } from "react-icons/gr";

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
  const [sliderData, setSliderData] = useState([]);
  const [langVal] = useState("uz");
  const [seminar, setSeminarData] = useState([]);
  const [centersData, setCentersData] = useState([]);
  const [teachers, setTeachers] = useState([]);

  const navigate = useNavigate();
  const doctaurant = useNavigate();
  const seminarNavigate = useNavigate();

  // const [data, setData] = useState([]);
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
          .then((req) => setDoctaurantsData(req.data.results));

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

        // await axios
        //   .get("/qoshimcha-malumotlar/institut-tarixi/")
        //   .then((req) => setData(req.data.results));

        setLoading(false);
      } catch (error) {
        setLoading("show-p");
      }
    };
    fetchData();
  }, []);

  const booksData = [
    {
      id: "",
      title: "O'zbekiston Tarix Jurnali",
      icon: jurnali,
      toLink: "/journal/tahririyat",
      text: "Ushbu bo‘limda dissertatsiya avtoreferatlari jamlangan bo‘lib, tarix fanining turli yo‘nalishlari bo‘yicha olib borilgan ilmiy tadqiqotlar bilan tanishishingiz mumkin. Bu materiallar tadqiqotchilar, talaba va ilmiy izlanish olib boruvchilar uchun muhim manba hisoblanadi",
    },
    {
      id: 1,
      title: "Manbalar",
      icon: manbalar,
      toLink: "/manbalar",
      text: "Elektron kutubxonamizda tarixiy tadqiqotlar, ilmiy monografiyalar va nodir manbalar to‘plangan. Siz bu yerda turli davrlarga oid akademik asarlar bilan tanishib, ilmiy izlanishlaringiz uchun foydali ma’lumotlarni topishingiz mumkin",
    },

    {
      id: 2,
      title: "Adabiyotlar",
      icon: adabiyotlar,
      toLink: "/adabiyotlar",
      text: "Ushbu bo‘limda tarixiy manbalar, arxiv hujjatlari va tadqiqotlar uchun muhim materiallar to‘plangan. Ilmiy izlanishlar uchun zarur bo‘lgan barcha manbalarni topishingiz mumkin",
    },

    {
      id: 3,
      title: "Avtoreferatlar",
      icon: avtorefaratlar,
      toLink: "/avtorefaratlar",
      text: "Ushbu bo‘limda dissertatsiya avtoreferatlari jamlangan bo‘lib, tarix fanining turli yo‘nalishlari bo‘yicha olib borilgan ilmiy tadqiqotlar bilan tanishishingiz mumkin. Bu materiallar tadqiqotchilar, talaba va ilmiy izlanish olib boruvchilar uchun muhim manba hisoblanadi",
    },
  ];

  let sliderCentersRef = useRef(null);
  let sliderBolimlarRef = useRef(null);

  const nextBolimlar = () => {
    sliderBolimlarRef.slickNext();
  };

  const previousBolimlar = () => {
    sliderBolimlarRef.slickPrev();
  };

  const nextCenters = () => {
    sliderCentersRef.slickNext();
  };

  const previousCenters = () => {
    sliderCentersRef.slickPrev();
  };

  var settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplaySpeed: 4000,
    autoplay: true,
    initialSlide: 0,
    pauseOnHover: true,

    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 1080,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

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
          <h2>{t("departments")}</h2>
          <div className="markaz_va_bolim">
            <div className="bolimButton">
              <button className="prevButton" onClick={previousBolimlar}>
                <GrPrevious style={{ fontSize: "16px" }} />
              </button>

              <Slider
                ref={(slider) => {
                  sliderBolimlarRef = slider;
                }}
                {...settings}
              >
                {teachers.map((item, index) => {
                  return (
                    <div key={index} className="shadow-card">
                      <div className="shadow">
                        <img src={item.image} alt="img" />
                        <p>{item?.[`title_${lang}`]}</p>
                        <button
                          onClick={() =>
                            navigate(
                              `/centers-and-departments/bolim/${item.id}`
                            )
                          }
                        >
                          Batafsil
                        </button>
                      </div>
                    </div>
                  );
                })}
              </Slider>

              <button className="nextButton" onClick={nextBolimlar}>
                <GrNext style={{ marginTop: "4px", fontSize: "16px" }} />
              </button>
            </div>
          </div>
        </div>

        <div className="img-cards">
          <h2>{t("centers")}</h2>
          <div className="markaz_va_bolim">
            <div className="bolimButton">
              <button className="prevButton" onClick={previousCenters}>
                <GrPrevious style={{ fontSize: "16px" }} />
              </button>

              <Slider
                ref={(slider) => {
                  sliderCentersRef = slider;
                }}
                {...settings}
              >
                {centersData.map((item, index) => {
                  return (
                    <div key={index} className="shadow-card">
                      <div className="shadow">
                        <img src={item.image} alt="img" />
                        <p>{item?.[`title_${lang}`]}</p>
                        <button
                          onClick={() =>
                            navigate(
                              `/centers-and-departments/markaz/${item.id}`
                            )
                          }
                        >
                          Batafsil
                        </button>
                      </div>
                    </div>
                  );
                })}
              </Slider>

              <button className="nextButton" onClick={nextCenters}>
                <GrNext style={{ marginTop: "4px", fontSize: "16px" }} />
              </button>
            </div>
          </div>
        </div>

        <div className="img-cards">
          <h2>{t("councils")}</h2>
          <div className="kengashlar">
            <Link className="yiginlarDetail" to="/sc-council">
              <span>{t("sc-council")}</span>
              <img src="./assets/icons/arrow.svg" alt="arrow" />
            </Link>

            <Link className="yiginlarDetail" to="/scientific-degree">
              <span>{t("scientific-degree")}</span>
              <img src="./assets/icons/arrow.svg" alt="arrow" />
            </Link>
            {/* scientific-degree  */}
            <Link className="yiginlarDetail" to="/sc-young">
              <span> {t("sc-young")}</span>
              <img src="./assets/icons/arrow.svg" alt="arrow" />
            </Link>

            <Link className="yiginlarDetail" to="/notices">
              <span>{t("notices")}</span>
              <img src="./assets/icons/arrow.svg" alt="arrow" />
            </Link>
          </div>
        </div>

        <div className="img-cards">
          <h2
            style={{ cursor: "pointer" }}
            onClick={() => doctaurant("/doctaurants")}
          >
            {t("doctaurants")}
          </h2>
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

                      <div className={styles["social-links"]}>
                        <a href="">
                          <FaFacebookF style={{ color: "#0000FFE2" }} />
                        </a>
                        <a href="">
                          <FaTwitter style={{ color: "#0000FFE2" }} />
                        </a>
                        <a href="">
                          <IoLogoInstagram style={{ color: "#0000FFE2" }} />
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
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div
            className="yiginlarCard"
            style={{ maxWidth: "1320px", margin: "0 auto", padding: "35px 0" }}
          >
            <h2
              style={{
                fontSize: "36px",
                fontFamily: "Poppins,sans-serf",
                color: "white",
                textAlign: "center",
              }}
            >
              {t("gatherings")}
            </h2>
            <div className="yiginlar">
              {seminar?.map((item, index) => {
                return (
                  <div
                    onClick={() => seminarNavigate(`/seminar/${item.id}`)}
                    key={index}
                    className="card-yiginlar"
                  >
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
                <Link className="link" to={`${item.toLink}/${item.id}`}>
                  <img
                    src={item?.icon}
                    alt="Book"
                    style={{ width: "140px", height: "120px" }}
                  />
                  <p>{item.title}</p>
                </Link>
              </div>
            ))}
          </div>
        </div>

        <div className="img-cards">
          <h2 style={{ margin: "70px 0 30px" }}>Foydali havolalar</h2>
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
