import React, { useState, useEffect } from 'react';
import './Video.css';
import video1 from "../../../public/videos/video1.mp4";
import video2 from "../../../public/videos/video2.mp4";
import video3 from "../../../public/videos/video3.mp4";

const videos = [video1, video2, video3];

export const Video = () => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  // Video bittiğinde bir sonraki videoya geçiş
  const handleVideoEnd = () => {
    setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length);
  };

  return (
    <div className="video-container">
      <video
        className="video"
        key={currentVideoIndex} // Her video değiştiğinde yeniden başlatır
        src={videos[currentVideoIndex]}
        loop={false}
        autoPlay
        muted
        onEnded={handleVideoEnd} // Video bittiğinde handleVideoEnd çağrılır
      >
        Your browser does not support the video tag.
      </video>
    </div>
  );
};