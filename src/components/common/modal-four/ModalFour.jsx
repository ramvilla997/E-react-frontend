import React from 'react';

import Modal from '../modal/Modal';
import { motion } from "framer-motion";
import '../../../styles/screens/LandingPage2.css';
import '../../../styles/screens/LandingPageHome.css';
import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';


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
  
const ModalFour = ({ closeFn = () => null, open = false }) => {
    const navigate = useNavigate();
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
        className="modal gray-gradient"
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"

        >
          <div className="modal--header">
          {/* <div className="content"> */}
          <br/>
          <h2 className="modal--header h2">Contact Us</h2>
          <br/> <br/><br/>
          </div>
          {/* </div> */}

          <div className="modal--header">
          {/* <div className="content"> */}
          <h3 className="modal--header h3" style={{textAlign: 'center', fontWeight: 'normal', }}>If you have any questions or concerns, please feel free to contact us: 
          <br/> <br/>
          Phone: +1613-804-8000
          <br/> <br/>
          Email: info@ehospital.com
          <br/> <br/><br/>
          Address: 12 Monet Crt. Ottawa, Ontario, K1T 4B6
          </h3>
          </div>
          {/* </div> */}
          

    
{/* 
          <div className="modal--header">
          <div className="content">
          <h3 className="modal--header h3" style={{textAlign: 'justify', fontWeight: 'normal',}}>Open React: Visit React platform</h3>
          </div>
          </div> */}


          <div> 

            <button
        type="button"
        className="button"
        onClick={() => {window.location.href="//e-react-frontend-55dbf7a5897e.herokuapp.com/"}}
      >
        Open React: Visit React platform
      </button>
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

export default ModalFour;