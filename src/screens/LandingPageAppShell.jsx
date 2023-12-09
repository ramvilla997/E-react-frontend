import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import ScreenSwitchboard from './LandingPageScreenSwitchboard';
import ModalManager from './LandingPageModalManager';
import '../styles/components/LandingPageStyles/LandingPageApp-Shell.css';

const AppShell = () => {
  const [modalOpen, setModal] = useState(false);

  const openModal = event => {
    event.preventDefault();
    const {
      target: {
        dataset: { modal }
      }
    } = event;
    if (modal) setModal(modal);
  };

  const closeModal = () => {
    setModal('');
  };

  return (
    <BrowserRouter>
    
      <div className="app--shell" onClick={openModal}>
        <ScreenSwitchboard />
        <ModalManager closeFn={closeModal} modal={modalOpen} />
      </div>
    </BrowserRouter>
  );
};

export default AppShell;