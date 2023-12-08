import { useEffect } from "react";
import { motion } from "framer-motion";
import { stateLogger } from "../../screens/stateLogger";
import Backdrop from "../Backdrop/Landingpage2";
import modalOpen from "../../screens/LandingPage2";
import className from "../../screens/LandingPage2";
//import '../styles/screens/LandingPage2.css';

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

//console.log("its submited usegsdfgsdfging ", className);

const Modal = ({ handleClose, text, type }) => {
    useEffect(() => {
        console.log("its submited useing ", modalOpen);
        stateLogger("Modal", true);
        return () => stateLogger("Modal", false);
      }, []);
      //if(modalOpen == close){}
      
  return (
    
    <Backdrop onClick={handleClose}>
      
        <motion.div
          //drag
          drag
            dragConstraints={{
            top: -50,
            left: -50,
            right: 50,
            bottom: 50,}}

          onClick={(e) => e.stopPropagation()}  // Prevent click from closing modal
          className="modal orange-gradient"
          variants={dropIn}
          initial="hidden"
          animate="visible"
          exit="exit"
          
          
        >
            
          <p>Test here</p>
          <h2>Our Mission</h2>
          <ModalText text={text} />
          <ModalButton onClick={handleClose} label="Close" />
          {/* <button  onClick={handleClose} >Close</button> */}
        </motion.div>
      
      
    </Backdrop>


  );
};



const ModalText = ({ text }) => (
    <div className="modal-text">
      <h3>{text}</h3>
      <h5>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius laboriosam labore, totam
        expedita voluptates tempore asperiores sequi, alias cum veritatis, minima dolor iste similique
        eos id. Porro, culpa? Officiis, placeat?
      </h5>
    </div>
  );
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
export default Modal;