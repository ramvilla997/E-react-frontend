import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './profile.css';
import { readLoginData } from '../loginData';

const ProfilePage = () => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loginData = readLoginData();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://e-react-node-backend-22ed6864d5f3.herokuapp.com/patientsRegistration');
        setUserData(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [loginData.id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Filter the user data based on loginData.id
  const filteredUserData = userData.filter((user) => user.id === loginData.id);

  return (
    <div className="profile-page">
      <h2>Patient Profile Details</h2>
      <div className="table-container">
        <table className="user-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Middle Name</th>
              <th>Last Name</th>
              <th>Age</th>
              <th>Blood Group</th>
              <th>Height</th>
              <th>Weight</th>
              <th>Race</th>
              <th>Mobile Number</th>
              <th>Email</th>
              <th>Address</th>
              <th>Location</th>
              <th>City</th>
              <th>Province</th>
              <th>Postal Code</th>
              <th>Latitude</th>
              <th>Longitude</th>
              <th>Health Card Number</th>
              <th>Passport Number</th>
              <th>PR Number</th>
              <th>Driver's Licence Number</th>
              <th>UUID</th>
              <th>Password</th>
              <th>Verification</th>
            </tr>
          </thead>
          <tbody>
            {filteredUserData.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>                <td>{user.FName}</td>                <td>{user.MName}</td>                <td>{user.LName}</td>                <td>{user.Age}</td>                <td>{user.BloodGroup}</td>                <td>{user.height}</td>                <td>{user.weight}</td>                <td>{user.race}</td>                <td>{user.MobileNumber}</td>                <td>{user.EmailId}</td>                <td>{user.Address}</td>                <td>{user.Location}</td>                <td>{user.City}</td>                <td>{user.Province}</td>                <td>{user.PostalCode}</td>                <td>{user.Latitude}</td>                <td>{user.Longitude}</td>                <td>{user.HCardNumber}</td>                <td>{user.PassportNumber}</td>                <td>{user.PRNumber}</td>                <td>{user.DLNumber}</td>                <td>{user.uuid}</td>                <td>{user.password}</td>                <td>{user.verification}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProfilePage;