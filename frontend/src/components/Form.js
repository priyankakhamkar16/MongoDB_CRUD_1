import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import './Form.css';

const UserForm = () => {
  const [user, setUser] = useState({
    serialNumber: '',
    name: '',
    address: '',
    mobileNumber: '',
    email: '',
    password: '',
    dob: '',
    city: '',
    gender: '',
    gstNumber: ''
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState(''); // State for success message
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let validationErrors = {};
    const mobilePattern = /^[789]\d{9}$/; // Mobile number starting with 7, 8, or 9 and 10 digits
    const emailPattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/; // Email pattern
    const dobPattern = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/\d{4}$/; // DD/MM/YYYY pattern
    const gstPattern = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/; // GST Number pattern

    if (!user.serialNumber) {
      validationErrors.serialNumber = 'Serial Number is required.';
    }

    if (!user.name) {
      validationErrors.name = 'Name is required.';
    }

    if (!user.address) {
      validationErrors.address = 'Address is required.';
    }

    if (!user.mobileNumber) {
      validationErrors.mobileNumber = 'Mobile Number is required.';
    } else if (!mobilePattern.test(user.mobileNumber)) {
      validationErrors.mobileNumber = 'Mobile number should start with 7, 8, or 9 and be 10 digits long.';
    }

    if (!user.email) {
      validationErrors.email = 'Email is required.';
    } else if (!emailPattern.test(user.email)) {
      validationErrors.email = 'Please enter a valid email address.';
    }

    if (!user.password) {
      validationErrors.password = 'Password is required.';
    }

    if (!user.dob) {
      validationErrors.dob = 'Date of Birth is required.';
    } else if (!dobPattern.test(user.dob)) {
      validationErrors.dob = 'Please enter the DOB in the correct format (dd/mm/yyyy).';
    }

    if (!user.city) {
      validationErrors.city = 'City is required.';
    }

    if (!user.gender) {
      validationErrors.gender = 'Please select a gender.';
    }

    if (!user.gstNumber) {
      validationErrors.gstNumber = 'GST Number is required.';
    } else if (!gstPattern.test(user.gstNumber)) {
      validationErrors.gstNumber = 'Please enter a valid GST Number.';
    }

    return validationErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSuccessMessage(''); // Clear success message on validation error
    } else {
      try {
        const res = await axios.post('http://localhost:5000/api/users', user); // Corrected endpoint
        console.log(res.data);
        setSuccessMessage('Form submitted successfully!'); // Set success message
        // Clear form after submission
        setUser({
          serialNumber: '',
          name: '',
          address: '',
          mobileNumber: '',
          email: '',
          password: '',
          dob: '',
          city: '',
          gender: '',
          gstNumber: ''
        });
        setErrors({});
      } catch (error) {
        console.error('Error:', error.response ? error.response.data.message : error.message);
        setSuccessMessage(''); // Clear success message on error
      }
    }
  };

  const handleViewAccount = () => {
    navigate('/account-info'); // Redirect to the account info page
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input type="number" name="serialNumber" placeholder="Serial Number" value={user.serialNumber} onChange={handleChange} />
          {errors.serialNumber && <p className="error">{errors.serialNumber}</p>}
        </div>

        <div className="form-group">
          <input type="text" name="name" placeholder="Name" value={user.name} onChange={handleChange} />
          {errors.name && <p className="error">{errors.name}</p>}
        </div>

        <div className="form-group">
          <input type="text" name="address" placeholder="Address" value={user.address} onChange={handleChange} />
          {errors.address && <p className="error">{errors.address}</p>}
        </div>

        <div className="form-group">
          <input type="text" name="mobileNumber" placeholder="Mobile Number" value={user.mobileNumber} onChange={handleChange} />
          {errors.mobileNumber && <p className="error">{errors.mobileNumber}</p>}
        </div>

        <div className="form-group">
          <input type="email" name="email" placeholder="Email" value={user.email} onChange={handleChange} />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>

        <div className="form-group">
          <input type="password" name="password" placeholder="Password" value={user.password} onChange={handleChange} />
          {errors.password && <p className="error">{errors.password}</p>}
        </div>

        <div className="form-group">
          <input type="text" name="dob" placeholder="DOB (dd/mm/yyyy)" value={user.dob} onChange={handleChange} />
          {errors.dob && <p className="error">{errors.dob}</p>}
        </div>

        <div className="form-group">
          <input type="text" name="city" placeholder="City" value={user.city} onChange={handleChange} />
          {errors.city && <p className="error">{errors.city}</p>}
        </div>

        <div className="form-group">
          <select name="gender" value={user.gender} onChange={handleChange}>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          {errors.gender && <p className="error">{errors.gender}</p>}
        </div>

        <div className="form-group">
          <input type="text" name="gstNumber" placeholder="GST Number" value={user.gstNumber} onChange={handleChange} />
          {errors.gstNumber && <p className="error">{errors.gstNumber}</p>}
        </div>

        <button type="submit">Submit</button>
      </form>
      <button onClick={handleViewAccount}>View Your Account</button>
      {successMessage && <p className="success">{successMessage}</p>} {/* Success message */}
    </div>
  );
};

export default UserForm;
