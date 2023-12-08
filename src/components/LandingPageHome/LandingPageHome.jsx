import React from 'react';
import { AnimatePresence, motion } from "framer-motion";
import '../../styles/screens/LandingPage2.css';








const LandingPageHome = ({}) => {
  

  return (
    
    <main className="app--screen screen--one">
      {/* <h2>Screen One</h2> */}
      
      <div style={{ display: 'flex', columnGap: 25 }}>
        {/* <button type="button" data-modal="modal-one">
          Our Mission
        </button> */}
        {/* <button type="button" data-modal="modal-two">
          Solutions
        </button>
        <button type="button" data-modal="modal-three">
          Contact Us
        </button> */}
        <motion.button
        whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          //type="button" 
          data-modal="modal-one"
          className="save-button2"
          >
          About Us
          </motion.button>
        <motion.button
        whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          //type="button" 
          data-modal="modal-two"
          className="save-button2"
          >
          Our Mission
          </motion.button>
        <motion.button
        whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          //type="button" 
          data-modal="modal-three"
          //onClick={handleClick}
          className="save-button2"
          >
          Solutions
          </motion.button>
        <motion.button
        whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          //type="button" 
          data-modal="modal-four"
          className="save-button2"
          >
          Contact Us
          </motion.button>
      </div>
    </main>
  );
};

export default LandingPageHome;