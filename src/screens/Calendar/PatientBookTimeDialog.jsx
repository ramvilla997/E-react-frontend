import moment from 'moment';
import React, { useState } from 'react';
import { Modal } from 'antd';

import { patientBookTime } from '../../api/calendar';
import { readLoginData } from '../../loginData';

const dateFormat = 'YYYY-MM-DD HH:mm:ss';

const ModalContent = (props) => {
  const start = moment(props.start).format(dateFormat);
  const end = moment(props.end).format(dateFormat);
  const onDescription = (e) => {
    props.onChange({ description: e.target.value });
  };
  
  return <>
    <form>
      <label for="id">ID:</label><br/>
      <input type="text" id="id" name="id" value={props.id} disabled/><br/>
      <label for="doctor">Doctor:</label><br/>
      <input type="text" id="doctor" name="doctor" value={props.doctor} disabled/><br/>
      <label for="start">Start:</label><br/>
      <input type="text" id="start" name="start" value={start} disabled/><br/>
      <label for="end">End:</label><br/>
      <input type="text" id="end" name="end" value={end} disabled/><br/>
      <label for="end">Doctor's Statement:</label><br/>
      <input type="text" id="statement" name="statement" value={props.statement} disabled/><br/>
      <label for="description">Reason:</label><br/>
      <input type="text" id="description" name="description" value={props.description} onChange={onDescription}/><br/>
    </form>
  </>;
};

const PatientBookTimeDialog = (props) => {
  const loginData = readLoginData();

  const [ formContent, setFormContent ] = useState({
    id: props.id,
    doctor: props.doctor,
    start: props.start,
    end: props.end,
    statement: props.statement,
    description: props.description,
  });

  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleFormChange = (change) => {
    setFormContent({...formContent, ...change});
  }

  const handleOk = () => {
    setConfirmLoading(true);
    (async () => {
      await patientBookTime(
        loginData,
        props.id,
        formContent.description);
      props.onOk();
    })();
  };

  return (
    <Modal
      title="Book Time for Appointment"
      open={true}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={props.onCancel}
    >
      <ModalContent
        {...formContent}
        onChange={handleFormChange}/>
    </Modal>
  );
};

export default PatientBookTimeDialog;
