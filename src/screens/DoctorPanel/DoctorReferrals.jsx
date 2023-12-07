import * as React from 'react';
import { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { useOutletContext } from 'react-router-dom';

export function DoctorReferrals() {
    const doctorId = useOutletContext();

    const [createdReferrals, setCreatedReferrals] = useState([]);
    const [incomingReferrals, setIncomingReferrals] = useState([]);

useEffect(() => {
      // Fetch created referrals
      //https://e-react-node-backend-22ed6864d5f3.herokuapp.com
      //http://localhost:8080
      axios.post('https://e-react-node-backend-22ed6864d5f3.herokuapp.com/getReferral', { doctorId })
          .then(response => {
              const modifiedData = response.data.map(item => ({
                  ...item,
                  id: item.referral_id  // Set referral_id as the custom row id
              }));
              setCreatedReferrals(modifiedData);
          })
          .catch(error => console.error('Error fetching created referrals:', error));
  
      // Fetch incoming referrals
      axios.post('https://e-react-node-backend-22ed6864d5f3.herokuapp.com/getIncomingReferrals', { doctorId })
          .then(response => {
              const modifiedData = response.data.map(item => ({
                  ...item,
                  id: item.referral_id  // Set referral_id as the custom row id
              }));
              setIncomingReferrals(modifiedData);
          })
          .catch(error => console.error('Error fetching incoming referrals:', error));
  }, [doctorId]);
  

    // Define columns for DataGrids
    const columnsCreated = [
        { field: 'id', headerName: 'ID', flex: 0.5 },
        {
            field: 'referredDoctor',
            headerName: 'To Doctor',
            flex: 1,
            valueGetter: (params) =>
                `${params.row.referred_doctor_FName || ''} ${params.row.referred_doctor_LName || ''}`,
        },
        {
          field: 'patient',
          headerName: 'Patient',
          flex: 1,
          valueGetter: (params) =>
              `${params.row.patient_FName || ''} ${params.row.patient_LName || ''}`,
        },
        {
          field: 'referral_date', 
          headerName: 'Created On', 
          flex:1
        }
        // Add other columns as needed
    ];
    // Define columns for DataGrids
    const columnsIncomming = [
          { field: 'id', headerName: 'ID', flex: 0.5 },
          {
            field: 'patient',
            headerName: 'Patient',
            flex: 1,
            valueGetter: (params) =>
                `${params.row.patient_FName || ''} ${params.row.patient_LName || ''}`,
          },
          {
              field: 'referredDoctor',
              headerName: 'From Doctor',
              flex: 1,
              valueGetter: (params) =>
                  `${params.row.referring_doctor_FName || ''} ${params.row.referring_doctor_LName|| ''}`,
          },
          {
            field: 'referral_date', 
            headerName: 'Created On', 
            flex:1
          }
          // Add other columns as needed
      ];
    const dataGridStyle = {
      minHeight: 400, // Minimum height of 400px
      height: '100%', // Adjust height to 100% to fill container
      maxHeight:600,
      width: '100%',  // Adjust width to 100% to fill container
  };

    return (
        <Container maxWidth="xl">
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                        <h3>Created Referrals</h3>
                        <DataGrid
                            rows={createdReferrals}
                            columns={columnsCreated}
                            pageSize={5}
                            rowsPerPageOptions={[5]}
                            checkboxSelection
                            sx={dataGridStyle}
                        />
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                        <h3>Incoming Referrals</h3>
                        <DataGrid
                            rows={incomingReferrals}
                            columns={columnsIncomming}
                            pageSize={5}
                            rowsPerPageOptions={[5]}
                            checkboxSelection
                            sx={dataGridStyle}
                        />
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
}
