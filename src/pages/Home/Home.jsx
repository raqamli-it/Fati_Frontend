import { useTranslation } from "react-i18next";
import styles from "./home.module.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick/lib/slider";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import HomeNews from "../HomeNews/HomeNews";
import dateFormat from "dateformat";
import { GiCloudDownload } from "react-icons/gi";

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

const settings = {
  className: "center",
  centerMode: true,
  infinite: true,
  centerPadding: "60px",
  slidesToShow: 3,
  speed: 500,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

export const Home = ({ setLoading, loading }) => {
  const { t, i18n } = useTranslation();
  const [doctaurantsData, setDoctaurantsData] = useState([]);
  const [newsData, setNewsData] = useState([]);
  const [quickLinksData, setQuickLinksData] = useState([]);
  const [centersData, setCentersData] = useState([]);
  const [booksData, setBooksData] = useState([]);
  const [sliderData, setSliderData] = useState([]);
  const [langVal] = useState("uz");
  const [seminar, setSeminarData] = useState([]);

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
          .then((req) => setDoctaurantsData(req.data.results));

        await axios
          .get("/qoshimcha-malumotlar/karusel/")
          .then((req) => setSliderData(req.data));
        await axios
          .get("/qoshimcha-malumotlar/yangiliklar/")
          .then((req) => setNewsData(req.data.results));
        await axios
          .get("/qoshimcha-malumotlar/havolalar/")
          .then((req) => setQuickLinksData(req.data.results));
        await axios
          .get("/markazlar-va-bolimlar/markazlar_bolimlar/")
          .then((req) => setCentersData(req.data));
        await axios
          .get("/kutobxona/avtoreferat/")
          .then((req) => setBooksData(req.data.results));
        await axios
          .get("/seminar/seminar/")
          .then((req) => setSeminarData(req.data.results));

        await axios
          .get("/qoshimcha-malumotlar/institut-tarixi/")
          .then((req) => setData(req.data.results));
        setLoading(false);
        // setLoading(false);
      } catch (error) {
        setLoading("show-p");
      }
    };
    fetchData();
  }, []);

  console.log(booksData, "booksData");

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
          <h1>{t("centers")}</h1>
          <div className="cards-effect">
            {centersData.map((item, index) => {
              return (
                <div className="card-effect" key={index}>
                  <Link to={"/centers-and-departments/" + item?.id}>
                    <div className="img-effect">
                      <img src={item?.image} />
                      <h1>dadadsds</h1>
                    </div>

                    <div className="wrapper">
                      <div className="data-form">
                        <h2>{item?.[`title_${lang}`]}</h2>
                        <span>{dateFormat(item.created_at, "dd.mm.yyyy")}</span>
                      </div>
                      <h3
                        dangerouslySetInnerHTML={{
                          __html: item?.[`tarix_${lang}`],
                        }}
                      ></h3>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>

        <div className="img-cards">
          <p className="card-text">{t("councils")}</p>
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
        {/*  */}
        {/* <div className="doc-con">
          <h2>{t("doctaurants")}</h2>
          <div className="doctaurants">
            {doctaurantsData?.map((item, index) => {
              return (
                <div className="card" key={index}>
                  <div className="card-img">
                    <img src={item?.file} alt="user" />
                  </div>

                  <div className="content">
                    <h2>{item?.[`title_${lang}`]}</h2>
                    <ul>
                      <li>
                        <input type="checkbox" name="doc" id={`e1${index}`} />
                        <label htmlFor={`e1${index}`}>
                          <span>Mehnat faoliyati</span>
                          <GrDown />
                        </label>
                        {item?.[`mehnat_faolyati_${lang}`] ? (
                          <ol
                            dangerouslySetInnerHTML={{
                              __html: item?.[`mehnat_faolyati_${lang}`],
                            }}
                          />
                        ) : (
                          <ol>
                            <p>Nothing to see...</p>
                          </ol>
                        )}
                      </li>

                      <li>
                        <input type="checkbox" name="doc" id={`e2${index}`} />
                        <label htmlFor={`e2${index}`}>
                          <span>Ilmiy faoliyat</span>
                          <GrDown />
                        </label>
                        {item?.[`ilimiy_faolyati_${lang}`] ? (
                          <ol
                            dangerouslySetInnerHTML={{
                              __html: item?.[`ilimiy_faolyati_${lang}`],
                            }}
                          />
                        ) : (
                          <ol>
                            <p>Nothing to see...</p>
                          </ol>
                        )}
                      </li>

                      <li>
                        <input type="checkbox" name="doc" id={`e3${index}`} />
                        <label htmlFor={`e3${index}`}>
                          <span>Asarlari</span>
                          <GrDown />
                        </label>
                        {item?.[`asarlar_${lang}`] ? (
                          <ol
                            dangerouslySetInnerHTML={{
                              __html: item?.[`asarlar_${lang}`],
                            }}
                          />
                        ) : (
                          <ol>
                            <p>Nothing to see...</p>
                          </ol>
                        )}
                      </li>
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div> */}
        {/*  */}
        <div className="img-cards" style={{ margin: "70px 0 90px" }}>
          <h2>{t("gatherings")}</h2>
          <ul>
            {seminar?.map((item, index) => {
              return (
                <li key={index} className="no-border">
                  <Link to={"/seminar/" + item.id} key={item.id}>
                    <p>{t("seminar" + item.id)}</p>
                    <img src="./assets/icons/arrow.svg" alt="arrow" />
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="book_cards">
          <h2>{t("library")}</h2>
          <div className="card-list">
            {booksData?.map((item, index) => (
              <div className="cards" key={index}>
                <div className="cards-img">
                  <img src={item?.image} alt="Book" />
                  <a href={item.file} download={item.file}>
                    <GiCloudDownload />
                  </a>
                </div>

                <div className="cards-contents">
                  <h2>{item?.[`title_${lang}`]}</h2>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="quick-links">
          <h2>Foydali havolalar 5</h2>
          <div className="cards">
            {quickLinksData?.map((item) => {
              return (
                <a
                  className="card no-border"
                  href={item?.link}
                  target="_blank"
                  key={item?.id}
                >
                  <div className="card-img">
                    <img src={item?.file} alt="quick link" />
                  </div>
                  <p>{item?.[`title_${lang}`]}</p>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
