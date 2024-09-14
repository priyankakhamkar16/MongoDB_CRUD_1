import React, { useState } from 'react';
import axios from 'axios';
import './AccountInfo.css';

const AccountInfo = () => {
  const [serialNumber, setSerialNumber] = useState('');
  const [userInfo, setUserInfo] = useState(null);
  const [updateData, setUpdateData] = useState({});
  const [message, setMessage] = useState('');

  const handleSerialNumberChange = (e) => {
    setSerialNumber(e.target.value);
  };

  const fetchUserInfo = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/users/${serialNumber}`);
      setUserInfo(res.data);
      setMessage('');
    } catch (error) {
      console.error('Error fetching user info:', error.response ? error.response.data.message : error.message);
      setMessage('Error fetching user information');
    }
  };

  const handleUpdateChange = (e) => {
    setUpdateData({ ...updateData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      const res = await axios.put(`http://localhost:5000/api/users/${serialNumber}`, updateData);
      setUserInfo(res.data);
      setMessage('User information updated successfully');
    } catch (error) {
      console.error('Error updating user info:', error.response ? error.response.data.message : error.message);
      setMessage('Error updating user information');
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/users/${serialNumber}`);
      setUserInfo(null);
      setMessage('User information deleted successfully');
    } catch (error) {
      console.error('Error deleting user info:', error.response ? error.response.data.message : error.message);
      setMessage('Error deleting user information');
    }
  };

  return (
    <div>
      <input
        type="number"
        placeholder="Enter Serial Number"
        value={serialNumber}
        onChange={handleSerialNumberChange}
      />
      <button onClick={fetchUserInfo}>Fetch User Info</button>
      {userInfo && (
        <div>
          <h3>User Information</h3>
          <p>Serial Number: {userInfo.serialNumber}</p>
          <p>Name: {userInfo.name}</p>
          <p>Address: {userInfo.address}</p>
          <p>Mobile Number: {userInfo.mobileNumber}</p>
          <p>Email: {userInfo.email}</p>
          <p>Date of Birth: {userInfo.dob}</p>
          <p>City: {userInfo.city}</p>
          <p>Gender: {userInfo.gender}</p>
          <p>GST Number: {userInfo.gstNumber}</p>

          <h4>Update Information</h4>
          <input
            type="text"
            name="name"
            placeholder="Update Name"
            onChange={handleUpdateChange}
          />
          <input
            type="text"
            name="address"
            placeholder="Update Address"
            onChange={handleUpdateChange}
          />
          <input
            type="text"
            name="mobileNumber"
            placeholder="Update Mobile Number"
            onChange={handleUpdateChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Update Email"
            onChange={handleUpdateChange}
          />
          <input
            type="text"
            name="dob"
            placeholder="Update DOB (dd/mm/yyyy)"
            onChange={handleUpdateChange}
          />
          <input
            type="text"
            name="city"
            placeholder="Update City"
            onChange={handleUpdateChange}
          />
          <input
            type="text"
            name="gender"
            placeholder="Update Gender"
            onChange={handleUpdateChange}
          />
          <input
            type="text"
            name="gstNumber"
            placeholder="Update GST Number"
            onChange={handleUpdateChange}
          />
          <button onClick={handleUpdate}>Update User Info</button>

          <button onClick={handleDelete}>Delete User Info</button>
        </div>
      )}
      {message && <p>{message}</p>}
    </div>
  );
};

export default AccountInfo;
