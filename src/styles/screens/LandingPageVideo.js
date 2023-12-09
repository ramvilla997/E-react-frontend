import React from 'react';
import video from '../components/LandingPageStyles/LandingPageVideo.mp4';
import '../../styles/components/LandingPageStyles/LandingPageVideo.css';

const LandingPageVideo = () => {
  return (
    <div className="video-backgroundlanding">
      <video autoPlay muted loop className="fullscreen-videolanding">
        <source src={video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default LandingPageVideo;
