import React from 'react';
import LandingPageModalOne from '../components/common/LandingPageModal-One/LandingPageModalOne';
import LandingPageModalTwo from '../components/common/LandingPageModal-Two/LandingPageModalTwo';
import LandingPageModalThree from '../components/common/LandingPageModal-Three/LandingPageModalThree';
import LandingPageModalFour from '../components/common/LandingPageModal-Four/LandingPageModalFour';

const ModalManager = ({ closeFn, modal = '' }) => {
  return (
    <>
      <LandingPageModalOne closeFn={closeFn} open={modal === 'LandingPageModal-One'} />
      <LandingPageModalTwo closeFn={closeFn} open={modal === 'LandingPageModal-Two'} />
      <LandingPageModalThree closeFn={closeFn} open={modal === 'LandingPageModal-Three'} />
      <LandingPageModalFour closeFn={closeFn} open={modal === 'LandingPageModal-Four'} />
    </>
  );
};

export default ModalManager;
