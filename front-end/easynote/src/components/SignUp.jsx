import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useProfile } from './ProfileContext';

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    occupation: '',
    studying: '',
    profilePicture: null
  });
  const { setUser } = useProfile();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");  // Error message state

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          profilePicture: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send registration request
      
      const response = await axios.post("https://easynote-aivlj.ondigitalocean.app/api/users", formData, {  
      //const response = await axios.post("http://localhost:5000/users", formData, {  
        headers: {
          "Content-Type": "application/json"
        }
      });
      const resp = response.data; 
      const { username, email, occupation, studying, token } = resp;
      console.log("register:", username, email, occupation, studying, token);
      // Check if registration is successful
      if (token) {
        // Save token to localStorage
        localStorage.setItem('authToken', response.data.token);

        // Set the user in ProfileContext (if needed)
        setUser({ username, email, occupation, studying });

        // Navigate to the homepage
        navigate('/');
      } else {
        // If no token returned, show error
        setErrorMessage("Registration failed. Please try again.");
      }
    } catch (error) {
      // Handle error (e.g., server errors)
      console.error('Registration failed:', error);
      setErrorMessage(error.response?.data?.message || "Registration failed. Please try again.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2 className="auth-title">Create Account</h2>
        {/* Show error message if any */}
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        
        <form onSubmit={handleSubmit} className="auth-form">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="auth-input"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="auth-input"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="auth-input"
            required
          />
          <input
            type="text"
            name="occupation"
            placeholder="Occupation"
            value={formData.occupation}
            onChange={handleChange}
            className="auth-input"
          />
          <input
            type="text"
            name="studying"
            placeholder="What are you studying?"
            value={formData.studying}
            onChange={handleChange}
            className="auth-input"
          />
          <div className="file-input-container">
            <label className="file-input-label">
              Profile Picture (optional)
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="file-input"
              />
            </label>
          </div>
          {formData.profilePicture && (
            <div className="preview-image-container">
              <img
                src={formData.profilePicture}
                alt="Profile preview"
                className="preview-image"
              />
            </div>
          )}
          <button type="submit" className="auth-button">Sign Up</button>
        </form>
        <p className="auth-link">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
