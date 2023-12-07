import React from 'react';
import { motion } from "framer-motion";

import Modal from '../modal/Modal';
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
    type="button"
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
  >
    {label}
  </motion.button>
);
const ModalOne = ({ closeFn = () => null, open = false }) => {
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
        className="modal orange-gradient"
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"

        >
          <div className="modal--header">
          {/* <div className="content"> */}
          <h1 className="modal--header h1">About Us</h1>
          {/* </div> */}
          </div>

          <div className="modal--body">
          {/* <div className="content"> */}
          <h1 className="modal--body h1"  style={{textAlign: 'justify', fontWeight: 'normal', lineHeight: 1.5}} >Smart Digital Medicine (SDM) is a specialized Canadian company that is being established to provide specialized healthcare services, big data analytics, and public sector digital transformation. We at SDM develop innovative solutions for different sectors of medicine such as ehealth, mhealth, telemedicine, medical robots and automation (such as robotic surgery), and artificial intelligence-assisted diagnosis. We perfect our big data analytics and innovative medical diagnostic solutions by working with organizations across various healthcare institutes, including hospitals, clinics, labs, research centres, medical doctors, and universities. Our work with multiple types of end users has helped us understand that while many of these institutes could benefit from AI, big data analytics, and breakthrough technologies, only few have the capacity to implement innovative solutions. We will help users to utilize our innovative, comprehensive, highly accurate and smarter clinical reasoning processes and take advantage of data insights until they reach superior patient outcomes which includes but is not limited to the clinical interview, differential medical diagnosis, and treatment plans</h1>
          {/* </div> */}
          </div>
          <ModalButton onClick={closeFn} label="Close" />
            {/* <button type="button" onClick={closeFn}>
              Close
            </button> */}
          
        
        </motion.div>
      </div>
      
    </Modal>
  );
};

export default ModalOne;