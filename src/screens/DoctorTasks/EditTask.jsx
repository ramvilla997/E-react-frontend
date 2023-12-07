import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';
import backgroundImage from '../../assets/images/hospital.jpg';
import { Button, Modal, Spin } from "antd";
import { BASE_URL } from "../../constants";
import { readLoginData } from "../../loginData";
import PatientSelector from "./PatientSelector";

const findTask = async (id) => {
  const response = await axios.get(`${BASE_URL}/api/users/tasks/${id}`)
  return {
    id: response.data.id,
    Doctor: response.data.Doctor,
    Patient: response.data.Patient,
    Description: response.data.Description,
    Start: response.data.Start,
    End: response.data.End,
  };
};

const updateTask = async (id, state) => {
  await axios.put(`${BASE_URL}/api/users/tasks/${id}`, {
    Patient: state.Patient,
    Description: state.Description,
    Start: state.Start,
    End: state.End,
  })
  Modal.success({ content: "Task updated successfully!" });
};

const deleteTask = async (id) => {
  await axios.delete(`${BASE_URL}/api/users/tasks/${id}`)
  Modal.success({ content: "Task deleted successfully!" });
};

function Tasks() {
  const { id } = useParams();
  const loginData = readLoginData();
  const navigate = useNavigate();
  const [ state, setState ] = useState({
    Doctor: -1,
    Patient: -1,
    Start: "",
    End: "",
    Description: "",
  });

  const [ needLoad, setNeedLoad ] = useState(true);
  const [ loading, setLoading ] = useState(true);

  const loadData = async () => {
    setLoading(true);
    const result = await findTask(id);
    setState(result);
    setLoading(false);
  };

  if(needLoad){
    setNeedLoad(false);
    loadData();
  }

  const handleInputChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handlePatient = (e) => {
    setState({ ...state, Patient: e });
  };

  const handleUpdate = async () => {
    await updateTask(id, state);
    setNeedLoad(true);
  }

  const handleDelete = async () => {
    await deleteTask(id, state);
    navigate('/calendar');
  }

  return (
    <div style={{ 
      backgroundImage: `url(${backgroundImage})`,
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      margin: "auto", 
      width: "100vw", 
      height: "100vh",
      padding: "10px",
      filter: "brightness(100%)"
      }}>
      <div style={{ margin: "auto", width: "50%", padding: "10px" ,}}>
        <Spin spinning={loading}>
        <h1 style={{ textAlign: "center" }}>Doctor Task Management System</h1>
        <div style={{ border: "1px solid #ccc", padding: "10px" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label style={{ marginBottom: "5px", fontWeight: "bold" }}>ID: {id}</label>
            <label style={{ marginBottom: "5px", fontWeight: "bold" }}>Doctor: {loginData.name}</label>
            <label style={{ marginBottom: "5px", fontWeight: "bold" }}>Patient:</label>
            <PatientSelector value={state.Patient} onChange={handlePatient}/><br/>
            <label style={{ marginBottom: "5px", fontWeight: "bold" }}>Start Time:</label> 
            <input
              type="text"
              name="Start"
              placeholder="Start Time"
              value={state.Start}
              onChange={handleInputChange}
              style={{ marginBottom: "10px", padding: "5px" }}
            />
            <label style={{ marginBottom: "5px", fontWeight: "bold" }}>End Time:</label> 
            <input
              type="text"
              name="End"
              placeholder="End Time"
              value={state.End}
              onChange={handleInputChange}
              style={{ marginBottom: "10px", padding: "5px" }}
            />
            <label style={{ marginBottom: "5px", fontWeight: "bold" }}>Description:</label>
            <input
              type="text"
              name="Description"
              placeholder="Description"
              value={state.Description}
              onChange={handleInputChange}
              style={{ marginBottom: "10px", padding: "5px" }}
            />
          </div>
          <Button type="primary" onClick={handleUpdate} style={{ marginTop: "10px", padding: "5px" }}>
            Edit Task
          </Button>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <Button type="dashed" danger onClick={handleDelete} style={{ marginTop: "10px", padding: "5px" }}>
            Delete Task
          </Button>
        </div>
        </Spin>
      </div>
    </div>
  );
}

export default Tasks;