import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import axios from "axios";

const tableColumn = {
    age:"Age",
    gender:"Sex",
    cp:"Cp",
    trestbps:"Trestbps",
    chol:"Chol",
    fbs:"Fbs",
    restecg:"Restecg",
    thalach:"Thalach",
    exang:"Exang",
    oldpeak:"Oldpeak",
    slope:"Slope",
    ca:"Ca",
    thal:"Thal"

};

const API_ROOT = `https://e-react-node-backend-22ed6864d5f3.herokuapp.com`;  //TODO: Need to replace with the backend server address
const HEART_FAIL_API_ENDPOINT = `https://heartfailure-ml-be4fa0b3a334.herokuapp.com/predict`;

const HeartFail = () => {
    const location = useLocation();
    const patientId =location.state.id;

    const [predictionData, setPredictionData] = useState(null);
    const [heartFail, setHeartFail] = useState();

    const predictHeartFail = async () => {
        const predictionResponse = await axios.post(HEART_FAIL_API_ENDPOINT, { ...predictionData });
        setHeartFail(predictionResponse.data);
    }

    useEffect(() => {
        (async () => {
            const strokeDataResponse  = await axios.get(`${API_ROOT}/heartfailure/${patientId}`);
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
            <br/><h2>Heart Failure Prediction</h2><br/>
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
                <h4 style={{clear:"both"}}><br/>Heart Failure risk for the patient is {heartFail?.prediction}</h4>
                        <div style={{display: "flex", justifyContent: "center", margin: "10px" }}>    <button onClick={predictHeartFail}>Diagnose</button></div>
            </div>
        </React.Fragment>
    );
};

export default HeartFail;
