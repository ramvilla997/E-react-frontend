import React from 'react';

import Modal from '../modal/Modal';
import { motion } from "framer-motion";
import '../../../styles/screens/LandingPage2.css';
import '../../../styles/screens/LandingPageHome.css';

const dropIn = {
  hidden: {
    y: "-100vh",
    opacity: 0,
  },
  visible: {
    y: "0",
    opacity: 1,
    transition: {
      duration: 0.1,
      type: "spring",
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    y: "100vh",
    opacity: 0,
  },
};
const ModalButton = ({ onClick, label }) => (
  <motion.button
    className="modal-button"
    //type="button"
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
  >
    {label}
  </motion.button>
);
const ModalTwo = ({ closeFn = () => null, open = false }) => {
  return (
    <Modal open={open}>
      <div className="modal--mask">
        <motion.div 
        drag
        dragConstraints={{
        top: -50,
        left: -50,
        right: 50,
        bottom: 50,}}
        className="modal blue-gradient"
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"

        >
          <div className="modal--header">
          {/* <div className="content"> */}
          <br/> <br/><br/> <br/><br/>
          <h2 className="modal--header h2">Our Mission</h2>
          </div>
          {/* </div> */}

          <div className="modal--body">
          {/* <div className="content"> */}
          <h2 className="modal--body h2" style={{textAlign: 'justify', fontWeight: 'normal', lineHeight: 1.5}}><em>"Engineering Smarter Medicine"</em></h2>
          </div>
          {/* </div> */}
          <ModalButton onClick={closeFn} label="Close" />
            {/* <button type="button" onClick={closeFn}>
              Close
            </button> */}
          
        
        </motion.div>
      </div>
      
    </Modal>
  );
};

export default ModalTwo;
