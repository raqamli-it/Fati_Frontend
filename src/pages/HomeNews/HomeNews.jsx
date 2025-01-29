import React from "react";
import "./HomeNews.css";
import { Fade } from "react-awesome-reveal";

function HomeNews({ newsData }) {
  return (
    <div className="news-container">
      {newsData?.map((value, index) => (
        <div key={index} className="news-items">
          <Fade direction="up" cascade>
            <div className="news-img">
              <img src={value?.file} alt={value.status} />
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
    </div>
  );
}

export default HomeNews;
