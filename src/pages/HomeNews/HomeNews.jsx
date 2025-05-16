import "./HomeNews.css";
import { Fade } from "react-awesome-reveal";
import React, { useRef } from "react";
import Slider from "react-slick";
import { GrNext, GrPrevious } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";

function HomeNews({ newsData }) {
  const navigate = useNavigate();

  let sliderRef = useRef(null);

  const next = () => {
    sliderRef.slickNext();
  };

  const previous = () => {
    sliderRef.slickPrev();
  };

  var settings = {
    // dots: true,
    arrows: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,

    responsive: [
      {
        breakpoint: 1320,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1080,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  console.log(newsData, "xxxxxxxxx");

  return (
    <div>
      <h2 onClick={() => navigate(`/news`)} className="title">
        Yangiliklar
      </h2>
      
      <div className="news-container slider-container">
        <button className="prevButton" onClick={previous}>
          <GrPrevious />
        </button>

        <Slider
          ref={(slider) => {
            sliderRef = slider;
          }}
          {...settings}
        >
          {newsData?.slice(0, 6).map((value, index) => (
            <div key={index} className="news-items">
              <Fade
                direction="up"
                cascade
                delay={100 * (index + 1)}
                duration={900}
                triggerOnce
              >
                <div className="news-img">
                  <img src={value?.image} alt={value.status} />
                </div>
              </Fade>

              <div className="lineX"></div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  minHeight: "120px",
                  width: "90%",
                  margin: "0 auto",
                }}
              >
                <p className="content_uz">{value.title_uz}</p>

                <button
                  title="Batafsil ko'rish"
                  onClick={() => navigate(`news/${value.id}`)}
                  className="news-btn"
                >
                  Batafsil
                </button>
              </div>
            </div>
          ))}
        </Slider>

        <button className="nextButton" onClick={next}>
          <GrNext />
        </button>
      </div>
    </div>
  );
}

export default HomeNews;
