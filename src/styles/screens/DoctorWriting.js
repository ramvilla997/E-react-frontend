import React from 'react';
import video from '../screens/DoctorWriting.mp4';

const DoctorWriting = () => {
  return (
    <div className="video-background">
      <video autoPlay muted loop className="fullscreen-video">
        <source src={video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default DoctorWriting;