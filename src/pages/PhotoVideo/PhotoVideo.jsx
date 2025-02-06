import React, { useState } from "react";
import "./PhotoVideo.css";

function PhotoVideo({ activeData }) {
  const [fotoVideo, setFotoVideo] = useState(0);

  const getVideoId = (link) => {
    if (link.includes("youtu.be/")) {
      return link.split("youtu.be/")[1]?.split("?")[0];
    }
    if (link.includes("watch?v=")) {
      return link.split("watch?v=")[1]?.split("&")[0];
    }
    return null;
  };

  const FotoVideos = (id) => {
    setFotoVideo(id);
  };

  console.log(activeData);

  return (
    <div className="fotoVideo">
      <div className="btn">
        <button
          style={{ color: fotoVideo === Number(1) ? "#ff0000c2" : "black" }}
          onClick={() => FotoVideos(1)}
        >
          FOTO
        </button>
        <button
          style={{ color: fotoVideo === Number(2) ? "#ff0000c2" : "black" }}
          onClick={() => FotoVideos(2)}
        >
          VIDEO
        </button>
      </div>

      {fotoVideo === Number(1) && (
        <div className="images">
          {activeData[0]?.photos?.map((value, index) => (
            <div className="image" key={index}>
              <img src={value.image} alt="" />
            </div>
          ))}
        </div>
      )}

      {fotoVideo === Number(2) && (
        <div className="videos">
          {activeData[0]?.videos?.map((value, index) => {
            const videoId = getVideoId(value.link);

            return (
              <div key={index}>
                {videoId ? (
                  <iframe
                    width="100%"
                    height="350px"
                    style={{ border: "none" }}
                    src={`https://www.youtube.com/embed/${videoId}`}
                    allowFullScreen={true}
                    title="YouTube Video"
                  ></iframe>
                ) : (
                  <p>Videoga havola yo‘q</p>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default PhotoVideo;
