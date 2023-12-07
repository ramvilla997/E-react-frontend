import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import LandingPageVideo from '../styles/screens/LandingPageVideo';
import VideoBackground from '../styles/screens/VideoBackground';
//import '../styles/screens/AboutUs.css';


import AppShell from './AppShell';

import '../styles/screens/LandingPageHome.css';
import '../styles/screens/LandingPage2.css';




const LandingPageHome = () => {


    ReactDOM.render(
      
  <StrictMode>
    
    
    <AppShell />
    <div className="landing-body">
    <LandingPageVideo />
    {/* <div className="content"> */}
    <h1 className="landing-h1" style={{textShadow: "1px 3px 1px rgb(45, 45, 45)"}}>Smart Digital Medicine</h1>
    
    
    
    </div>

    <div className="modal--header">
          {/* <div className="content"> */}
          <h9 className="modal--header h9" style={{textAlign: 'center', 
          fontWeight: 'normal',textShadow: "1px 2px 1px rgb(10, 10, 10)" }} 
          >Revolutionzing Healthcare
          </h9>

      
          {/* </div> */}
          </div>
    <div className="modal--header">
          {/* <div className="content"> */}
          <h10 className="modal--header h10" style={{textAlign: 'center', 
          fontWeight: 'normal',textShadow: "1px 2px 1px rgb(10, 10, 10)" }} 
          >Explore Our Smart Digital Medicine Solutions<br/> 
          {/* Discover the Power of Smart Digital Medicine<br/> 
          Embracing the Possibilities of Smart Digital Healthcare<br/> 
          Revolutionzing Healthcare for a Connected Future */}
          </h10>

      
          {/* </div> */}
          </div>
    {/* </div> */}
  </StrictMode>,
  document.getElementById('root')
  
);

};
export default LandingPageHome;