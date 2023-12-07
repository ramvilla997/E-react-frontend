import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import axios from "axios";

const tableColumn = {
    gender: "Gender",
    age: "Age",
    hypertension: "Hypertension",
    heart_disease: "Heart Disease",
    ever_married: "Ever Married",
    work_type: "Work Type",
    Residence_type: "Residence Type",
    avg_glucose_level: "Average Glucose Level",
    bmi: "BMI",
    smoking_status: "Smoking Status",
    //action: "",
};

const API_ROOT = `https://e-react-node-backend-22ed6864d5f3.herokuapp.com`;  //TODO: Need to replace with the backend server address
const BRAIN_STROKE_API_ENDPOINT = `https://brainstroke-ml-4934488117a8.herokuapp.com/predict`;

const BrainStroke = () => {
    const location = useLocation();
    const patientId =location.state.id;

    const [predictionData, setPredictionData] = useState(null);
    const [brainStroke, setBrainStroke] = useState();

    const predictBrainStroke = async () => {
        const predictionResponse = await axios.post(BRAIN_STROKE_API_ENDPOINT, { ...predictionData });
        setBrainStroke(predictionResponse.data);
    }

    useEffect(() => {
        (async () => {
            const strokeDataResponse  = await axios.get(`${API_ROOT}/brainstroke/${patientId}`);
            setPredictionData(strokeDataResponse.data);
        })();
    }, []);

    const displayTableHead = () => {
        return Object.keys(tableColumn).map((columnKey) => {
            const columnValue = tableColumn?.[columnKey];
            return <th>{columnValue}</th>
        });
    };

    const renderTableData = () => {
        return Object.keys(tableColumn).map((columnKey) => {
            if (predictionData?.[columnKey] === undefined) {
                return ;
            }
            return <td>{predictionData?.[columnKey]}</td>
        });
    };

    return (
        <React.Fragment>
            <br/><h2>Brain Stroke Prediction</h2><br/>
            <table style={{ margin: "0 auto"}}>
                <thead>
                    <tr>
                        {displayTableHead()}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        {renderTableData()}
                        
                    </tr>
                </tbody>
            </table>
            <div  style={{display: "flex", justifyContent: "center", margin: "10px" }}>
                <h4 style={{clear:"both"}}><br/>Brain Stroke risk for the patient is {brainStroke?.prediction}<br/><br/></h4>
            <div style={{display: "flex", justifyContent: "center", margin: "10px" }}><br/><br/><button onClick={predictBrainStroke}>Diagnose</button></div>
            </div>
        </React.Fragment>
    );
};

export default BrainStroke;
