import React, { useState } from "react";
import axios from "axios";
import { Modal, Radio } from "antd";
import moment from 'moment';
import { BASE_URL } from '../../constants';
import { readLoginData } from '../../loginData';
import PatientSelector from "./PatientSelector";

const dateFormat = 'YYYY-MM-DD HH:mm:ss';

const createTask = (doctor, state) => {
  axios
    .post(`${BASE_URL}/api/users/tasks/add`, {
      Doctor: doctor,
      Patient: state.patient,
      Start: new Date(state.start).toISOString(),
      End: new Date(state.end).toISOString(),
      Description: state.description,
    })
    .then((response) => {
      Modal.success({ content: "Task added successfully!" });
    })
    .catch((error) => {
      console.error(error);
    });
};


const ModalContent = (props) => {
  const start = moment(props.start).format(dateFormat);
  const end = moment(props.end).format(dateFormat);
  const onStart = (e) => {
    props.onChange({ start: e.target.value });
  };
  const onEnd = (e) => {
    props.onChange({ end: e.target.value });
  };
  const onPatient = (e) => {
    props.onChange({ patient: e });
  };
  const onDescription = (e) => {
    props.onChange({ description: e.target.value });
  };

  return <>
    <form>
      <label for="doctor">Doctor:</label><br/>
      <input type="text" id="doctor" name="doctor" value={props.doctor} disabled/><br/>
      <label for="patient">Patient:</label><br/>
      <PatientSelector value={props.patient} onChange={onPatient}/><br/>
      <label for="start">Start:</label><br/>
      <input type="text" id="start" name="start" value={start} onChange={onStart}/><br/>
      <label for="end">End:</label><br/>
      <input type="text" id="end" name="end" value={end} onChange={onEnd}/><br/>
      <label for="description">Descrption:</label><br/>
      <input type="text" id="description" name="description" value={props.description} onChange={onDescription}/><br/>
    </form>
  </>;
};

const AddTask = (props) => {
  const loginData = readLoginData();
  const [ formContent, setFormContent ] = useState({
    patient: undefined,
    start: props.start,
    end: props.end,
    description: "",
  });

  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleFormChange = (change) => {
    setFormContent({...formContent, ...change});
  }

  const handleOk = () => {
    setConfirmLoading(true);
    (async () => {
      await createTask(
        loginData.id,
        formContent);
      props.onOk();
    })();
  };

  return (
    <Modal
      title="Doctor Task Management System"
      open={true}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={props.onCancel}
    >
      <Radio.Group onChange={(e) => props.onType(e.target.value)} defaultValue={props.type}>
        <Radio.Button value={1}>Task</Radio.Button>
        <Radio.Button value={2}>Available Time Segment</Radio.Button>
      </Radio.Group>
      <ModalContent
        doctor={loginData.name}
        {...formContent}
        onChange={handleFormChange}/>
    </Modal>
  );
}

export default AddTask;
