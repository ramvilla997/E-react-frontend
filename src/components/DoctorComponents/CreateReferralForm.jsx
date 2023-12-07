import React, {useState, useEffect} from "react";
import { Button, TextField, Checkbox, Snackbar} from "@mui/material";
import FormControlLabel from '@mui/material/FormControlLabel';
import axios from 'axios';


const CreateReferralForm = ({ onClose, patientId, doctorId }) => {
    // State for form fields and logic for form submission
    const [referralDetails, setReferralDetails] = useState({
        referredDoctorFName: '',
        referredDoctorLName: '',
        referredDoctorPhone: '',
        referredDoctorSpecialization: '',
        isReferredDoctorInSystem: false,
        referredDoctorId: '',
        referralDate: '',
        referralMessage: '',
      });
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const handleChange = (event) => {
        const { name, value } = event.target;
        setReferralDetails({ ...referralDetails, [name]: value });
    };
      
    useEffect(() => {
      if (snackbarMessage !== '') {
          setSnackbarOpen(true);
      }
  }, [snackbarMessage]);
  
    const handleSubmit = async (e) => {
        e.preventDefault();
        const dataToSend = {
            ...referralDetails,
            patientId,  // Include patientId from props
            doctorId    // Include doctorId from props
        };
        try {
          setSnackbarMessage('Saving Referral!');
          setSnackbarOpen(true)
          clearForm()
          //http://localhost:8080
          const response = await axios.post('https://e-react-node-backend-22ed6864d5f3.herokuapp.com/saveReferral', dataToSend);
          console.log("Saving", response)
        } catch (error) {
            console.error('Error submitting referral:', error);
            setSnackbarMessage('Error submitting referral');
            setSnackbarOpen(true);
        }
    };
    
    const clearForm = () => {
        setReferralDetails({
            referredDoctorFName: '',
            referredDoctorLName: '',
            referredDoctorPhone: '',
            referredDoctorSpecialization: '',
            isReferredDoctorInSystem: false,
            referredDoctorId: '',
            referralDate: '',
            referralMessage: '',
        });
    }
    
    
    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
      };
    return (
        <>
        <form onSubmit={handleSubmit} >
        <TextField
          label="Referred Doctor's First Name"
          name="referredDoctorFName"
          value={referralDetails.referredDoctorFName}
          onChange={handleChange}
          fullWidth
          margin="normal"
          variant="standard"
          multiline
        />
        <TextField
          label="Referred Doctor's Last Name"
          name="referredDoctorLName"
          value={referralDetails.referredDoctorLName}
          onChange={handleChange}
          fullWidth
          margin="normal"
          variant="standard"
          multiline
        />
        <TextField
          label="Referred Doctor's Phone Number"
          name="referredDoctorPhone"
          value={referralDetails.referredDoctorPhone}
          onChange={handleChange}
          fullWidth
          margin="normal"
          variant="standard"
          multiline
        />
        <TextField
          label="Referred Doctor's Specialization"
          name="referredDoctorSpecialization"
          value={referralDetails.referredDoctorSpecialization}
          onChange={handleChange}
          fullWidth
          margin="normal"
          variant="standard"
          multiline
        />
       <FormControlLabel
              control={
                  <Checkbox
                      checked={referralDetails.isReferredDoctorInSystem}
                      onChange={(e) => {
                          setReferralDetails({ 
                              ...referralDetails, 
                              isReferredDoctorInSystem: e.target.checked,
                              referredDoctorId: e.target.checked ? referralDetails.referredDoctorId : '' // Clear the ID if unchecked
                          });
                      }} 
                      name="isReferredDoctorInSystem" 
                  />
              }
              label="Is Referred Doctor In System?"
          />
        <TextField
            label="Referred Doctor's ID (If In System)"
            name="referredDoctorId"
            value={referralDetails.referredDoctorId}
            onChange={handleChange}
            fullWidth
            margin="normal"
            variant="outlined"
            multiline
            disabled={!referralDetails.isReferredDoctorInSystem} // Disable based on checkbox state
        />

        <TextField
          label="Referral Date"
          name="referralDate"
          type="date"
          value={referralDetails.referralDate}
          onChange={handleChange}
          fullWidth
          margin="normal"
          variant="standard"
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="Referral Message"
          name="referralMessage"
          value={referralDetails.referralMessage}
          onChange={handleChange}
          fullWidth
          multiline
          rows={3}
          margin="normal"
          variant="standard"
        />
        <Button  variant='contained' color='primary' sx={{ mt: 2, mx:2, width:'45%' }}
          type='submit'
        >
          Create Referral
        </Button>
        <Button variant='contained' color='secondary'  sx={{ mt: 2, mx:2, width:'45%'}}
          onClick={onClose}
        >
          Exit
        </Button>
 
      </form>
      <Snackbar 
            key={snackbarMessage}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            open={snackbarOpen}
            autoHideDuration={6000}
            onClose={handleSnackbarClose}
            message={snackbarMessage}
            style={{ zIndex: 1500 }}
        />
      </>
      
    );
  };
  
  export default CreateReferralForm;