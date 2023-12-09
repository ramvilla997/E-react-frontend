import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import LandingPageVideo from '../styles/screens/LandingPageVideo';
import AppShell from './LandingPageAppShell';
import '../styles/components/LandingPageStyles/LandingPageHome.css';
import '../styles/components/LandingPageStyles/LandingPageExtra.css';

const LandingPageHome = () => {

    ReactDOM.render(
      
  <StrictMode>
    <AppShell />
    <div className="landing-body">
    <LandingPageVideo />
    <h1 className="landing-h1" style={{textShadow: "1px 3px 1px rgb(45, 45, 45)"}}>Smart Digital Medicine</h1>
    </div>
    <div className="landing-body">
          <h2 className="landing-h2" style={{textAlign: 'center', 
          fontWeight: 'normal',textShadow: "1px 2px 1px rgb(10, 10, 10)" }} 
          >Revolutionzing Healthcare
          </h2>
          </div>
    <div className="landing-body">
          <h2 className="landing-h2" style={{textAlign: 'center', 
          fontWeight: 'normal',textShadow: "1px 2px 1px rgb(10, 10, 10)" }} 
          >Explore Our Smart Digital Medicine Solutions<br/> 
          </h2>
          </div>
  </StrictMode>,
  document.getElementById('root')
);
};
export default LandingPageHome;