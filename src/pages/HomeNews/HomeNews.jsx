import "./HomeNews.css";
import { Fade } from "react-awesome-reveal";
import React, { useRef } from "react";
import Slider from "react-slick";
import { GrNext, GrPrevious } from "react-icons/gr";

function HomeNews({ newsData }) {
  let sliderRef = useRef(null);
  const next = () => {
    sliderRef.slickNext();
  };
  const previous = () => {
    sliderRef.slickPrev();
  };

  var settings = {
    dots: true,
    arrows: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
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

  return (
    <div>
      <h1 className="title">Yangiliklar</h1>
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
          {newsData?.slice(-6).map((value, index) => (
            <div key={index} className="news-items">
              <Fade direction="up" cascade duration={100 * value.id} delay={0}>
                <div className="news-img">
                  <img src={value?.image} alt={value.status} />
                </div>
              </Fade>

              <p className="title_en">{value.title_en}</p>
              <div className="lineX"></div>

              <p
                className="content_uz"
                dangerouslySetInnerHTML={{ __html: value.content_uz }}
              ></p>
              <button className="news-btn">Xammasini ko'rish</button>
            </div>
          ))}
        </Slider>

        <button className="NextButton" onClick={next}>
          <GrNext />
        </button>
      </div>
    </div>
  );
}

export default HomeNews;
