import React from 'react';
import { Route, Routes } from 'react-router-dom';

import ScreenOne from '../components/screen-one/ScreenOne';
import LandingPageHome from '../components/LandingPageHome/LandingPageHome';
import ModalFour from '../components/common/modal-four/ModalFour';
//import ScreenTwo from '../components/screen-two/ScreenTwo';
//import ScreenThree from '../components/screen-three/ScreenThree';

const ScreenSwitchboard = () => {
  return (
    <Routes>
      <Route path="/screen-one" element={<ScreenOne/>} />
      <Route path="/" element={<ModalFour/>} />
      <Route path="/LandingPageHome" element={<LandingPageHome/>} />
        {/* <ScreenThree />
      </Route> 
      <Route path="/screen-two" element={<ScreenTwo />} />
        <ScreenTwo />
      </Route> 
      <Route path="/screen-one" element={<ScreenOne />} />
        <ScreenOne />
      </Route> 
      <Route exact path="/" element={<ScreenOne />} />
         <ScreenOne />
      </Route>  */}
    </Routes>
  );
};

export default ScreenSwitchboard;
