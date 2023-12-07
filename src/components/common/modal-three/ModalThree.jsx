import React from 'react';

import Modal from '../modal/Modal';
import { motion } from "framer-motion";
import '../../../styles/screens/LandingPage2.css';
import '../../../styles/screens/LandingPageHome.css';
import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import LandingPageVideo from '../../../styles/screens/LandingPageVideo';
import DoctorWriting from '../../../styles/screens/DoctorWriting';
import SolutionsBGN from '../../../styles/screens/SolutionsBGN';



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
  
const ModalThree = ({ closeFn = () => null, open = false }) => {
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
          <SolutionsBGN /> 
          
          <div className="modal--header">
          {/* <div className="content"> */}
          <h4 className="modal--header h4" style={{textAlign: 'center', 
          fontWeight: 'normal', textShadow: "1px 2px 1px rgb(100, 100, 100)"}} 
          >Our e-Hospital platform offers <br/>convenient online consultations, <br/>
          medical records access, and <br/>appointment scheduling. </h4>
          {/* </div> */}
          </div>
        

          <div className="modal--header">
          {/* <div className="content"> */}
          <h5 className="modal--header h5" style={{textAlign: 'center', 
          fontWeight: 'normal',textShadow: "1px 2px 1px rgb(100, 100, 100)" }} 
          >With our Healthcare Provider Digital Twin, <br/>you can monitor and manage
           your health <br/>from the comfort of your home.</h5>
          {/* </div> */}
          </div>

          <div className="modal--header">
          {/* <div className="content"> */}
          <h6 className="modal--header h6" style={{textAlign: 'center', 
          fontWeight: 'normal',textShadow: "1px 2px 1px rgb(100, 100, 100)" }} 
          >Experience the precision<br/> and effectiveness of robotic<br/> surgery for 
          complex medical procedures</h6>
          {/* </div> */}
          </div>
          
          <div className="modal--header">
          {/* <div className="content"> */}
          <h7 className="modal--header h7" style={{textAlign: 'center', 
          fontWeight: 'normal', textShadow: "1px 2px 1px rgb(100, 100, 100)"}} 
          >Our Medical Digital Assistance <br/>provides real-time medical guidance <br/> 
          and support through AI-powered chatbots</h7>
          {/* </div> */}
          </div>

          <div className="modal--header">
          {/* <div className="content"> */}
          <h8 className="modal--header h8" style={{textAlign: 'center', 
          fontWeight: 'normal',textShadow: "1px 2px 1px rgb(100, 100, 100)" }} 
          >Leverage our advanced medical informatics <br/>to analyze patient data and <br/> 
          make informed decisions for better healthcare outcomes</h8>
          {/* </div> */}
          </div>

          <div> 
            <button
        type="button"
        className="save-button3"
        onClick={() => {window.location.href="//www.e-hospital.ca/index"}}
        //onClick={() => navigate("/")}
       // onClick={<Link to="/" onClick={this.forceUpdate} style={{ color: '#A4A4A4'}}>Dashboard</Link>}
      >
        E-Hospital
      </button>
      </div>
          
      <div> 
            <button
        type="button"
        className="save-button4"
        onClick={() => {window.location.href="//www.e-hospital.ca/under-developement"}}
        //onClick={() => navigate("/")}
       // onClick={<Link to="/" onClick={this.forceUpdate} style={{ color: '#A4A4A4'}}>Dashboard</Link>}
      >
        Healthcare Provider Digital Twin
      </button>
      </div>
      
      <div> 
            <button
        type="button"
        className="save-button5"
        onClick={() => {window.location.href="//www.e-hospital.ca/under-developement"}}
        //onClick={() => navigate("/")}
       // onClick={<Link to="/" onClick={this.forceUpdate} style={{ color: '#A4A4A4'}}>Dashboard</Link>}
      >
        Robotic Surgery
      </button>
      </div>

      <div> 
            <button
        type="button"
        className="save-button6"
        onClick={() => {window.location.href="//www.e-hospital.ca/under-developement"}}
        //onClick={() => navigate("/")}
       // onClick={<Link to="/" onClick={this.forceUpdate} style={{ color: '#A4A4A4'}}>Dashboard</Link>}
      >
        Medical Digital Assistance
      </button>
      </div>
      <div> 
            <button
        type="button"
        className="save-button7"
        onClick={() => {window.location.href="//www.e-hospital.ca/under-developement"}}
        //onClick={() => navigate("/")}
       // onClick={<Link to="/" onClick={this.forceUpdate} style={{ color: '#A4A4A4'}}>Dashboard</Link>}
      >
        Advanced Medical Informatics
      </button>
      </div>
      {/* <Link to="/" onClick={() => {window.location.href="/"}}>About</Link> */}
      {/* <a onClick={() => {window.location.href="/"}}>Something</a> */}

          <ModalButton onClick={closeFn} label="Close" />
            {/* <button type="button" onClick={closeFn}>
              Close
            </button> */}
          
        
        </motion.div>
        
      </div>
      
    </Modal>
    
  );
};

export default ModalThree;