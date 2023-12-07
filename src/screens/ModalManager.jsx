import React from 'react';

import ModalOne from '../components/common/modal-one/ModalOne';
import ModalTwo from '../components/common/modal-two/ModalTwo';
import ModalThree from '../components/common/modal-three/ModalThree';
import ModalFour from '../components/common/modal-four/ModalFour';

const ModalManager = ({ closeFn, modal = '' }) => {
  return (
    <>
      <ModalOne closeFn={closeFn} open={modal === 'modal-one'} />
      <ModalTwo closeFn={closeFn} open={modal === 'modal-two'} />
      <ModalThree closeFn={closeFn} open={modal === 'modal-three'} />
      <ModalFour closeFn={closeFn} open={modal === 'modal-four'} />
    </>
  );
};

export default ModalManager;
