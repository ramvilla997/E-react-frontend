import React from 'react';
import video from '../screens/SolutionsBGN.mp4';
import '../../styles/screens/SolutionsBGN.css';

const SolutionsBGN = () => {
  return (
    <div className="video-backgroundsolutions">
      <video autoPlay muted loop className="fullscreen-videosolutions">
        <source src={video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default SolutionsBGN;
