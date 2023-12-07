import React from 'react';
//import Header from '../components/Header';
import '../styles/screens/LandingPage2.css';
import reactLogo from "./main-image.jpg";
import LandingPageVideo from '../styles/screens/LandingPageVideo';
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
// import Input from "./components/Input";
// import Modal from "./components/Modal";
// import { add } from "./arr-utils";
import Modal from "../components/Modal/Landingpage2";
import useModal from "../hooks/useModal";
import { framerLogger } from "./stateLogger";
import Modal2 from "../components/Modal/Landingpage2";
import '../styles/screens/AboutUs.css';


const LandingPage2 = () => {
    // const [modalOpen, setModalOpen] = useState(false);
    // const close = () => setModalOpen(false);
    // const open = () => setModalOpen(true);
    const { modalOpen, close, open } = useModal();
   
    // const [clicked, setClicked] = useState("");
    // if (clicked == "second button"){
    //     {clicked && <Modal clicked={clicked} />}
    // }
    // const mysubmit = function (e) {
    //     e.preventDefault();
    //     console.log("its submited useing ", clicked);
    //   };
    return (
        <>
    <LandingPageVideo /> 
    {/* // <div>
    //     <form onSubmit={mysubmit}>
    // <div >
       <LandingPageVideo /> 
       {/* <img src={reactLogo} alt="React Image" /><br></br><br></br><br></br> */}
       {/* <a href="/searchpatient">Shortcut to Search</a><br></br><br></br>
       <a href="/DBConnection">DB Connection</a><br></br><br></br>
       <a href="/Tasks">Tasks</a><br></br><br></br>
       <a href="/webform">Surgery Feedback Form</a><br></br><br></br>
       <a href="/HealthcareModels">Hub</a><br></br><br></br>
       <a href="/VoiceRecoginition">VoiceRecoginition</a><br></br><br></br> */}

       {/* <a href="/serviceshomepage">ServicesHomePagee</a><br></br><br></br> */}
      {/*<h1>Welcome to Smart Digital Medi</h1>
        <p>Your Health, Our Priorfghity</p>*/} 
    
    <motion.button
          //type="submit"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="save-button"
        //   onClick={() => {
        //     setClicked("first button");
        //   }}
        //{clicked && <Modal clicked={clicked} />}
        onClick={open}
          
        >
          Contact Us
          
        </motion.button>
        
        <motion.button
          
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="save-button2"
          onClick={close}
        >
          Solutions
        </motion.button>

        <motion.button
          
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="save-button2"
          onClick={close}
        >
          Our Mission
        </motion.button>

        <motion.button
          
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="save-button2"
          onClick={close}
        >
          About Us
        </motion.button>

        <ModalContainer>
        {modalOpen && (
          <Modal modalOpen={modalOpen} handleClose={close} />
        )}
      </ModalContainer>
        
      
      <div className="about-body">
      
      <div className="content">
        <h1 className="h1">Smart Digital Medicineeee</h1>     
        <div className="about">
          <h2>Our Mission</h2>
   

        </div>

        <div className="about">
          <h2>Our Commitment</h2>
          <p> <b> <i>We are committed to fostering a healthcare ecosystem that is built on innovation, compassion, and sustainability. Our commitment extends to: </i></b> </p>
          <br />
  
        </div>

        <div className="about">
          <h2>Why Choose Us?</h2>

        </div>

        <div className="about">
          <p> <i><b> "Join us on our journey to redefine healthcare for the digital age. Together, we can shape a healthier and more connected future. At eHospital, your well-being is our priority, and we're committed to being your partner in health."</b> </i> </p>
        </div>
      </div>
    </div>
        {/* <motion.button
          type="submit"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="save-button2"
          onClick={() => {
            setClicked("second button");
          }}
          
          
        >
          Contact Ussss
          
          
        </motion.button> */}
          
    {/* </div>
    </form>


    </div> */}


    </>
  );
};
const ModalContainer = ({ children, label }) => (
    // Enables the animation of components that have been removed from the tree
    <AnimatePresence
      // Disable any initial animations on children that
      // are present when the component is first rendered
      initial={false}
      // Only render one component at a time.
      // The exiting component will finish its exit
      // animation before entering component is rendered
      mode="wait"
      // Fires when all exiting nodes have completed animating out
      onExitComplete={() => framerLogger(label)}
    >
      {children}
    </AnimatePresence>
  );
export default LandingPage2;