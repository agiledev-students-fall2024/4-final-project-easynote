import React, { useState } from 'react';
import { useProfile } from './ProfileContext';

const ViewProfile = () => {
  const { user, updateUser } = useProfile(); 
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: user.username,
    occupation: user.occupation,
    studying: user.studying,
    profilePicture: user.profilePicture,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    updateUser(formData); 
    setIsEditing(false);
  };

  if (!user) {
    return <p>Please log in to view your profile.</p>;
  }

  return (
    <div className="view-profile">
      <h1>Your Profile</h1>
      <div className="profile-details">
        <img
          src={formData.profilePicture || 'default-profile.png'}
          alt="Profile"
          className="profile-picture"
        />
        {isEditing ? (
          <form className="edit-profile-form">
            <label>
              Email:
              <input
                type="text"
                name="email"
                value={formData.profilePicture}
                onChange={handleChange}
              />
            </label>
            <div style={{ marginTop: '20px' }}>
              <label>
                Name:
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                />
              </label>
            </div>
            <div style={{ marginTop: '20px' }}>
              <label>
                Occupation:
                <input
                  type="text"
                  name="occupation"
                  value={formData.occupation}
                  onChange={handleChange}
                />
              </label>
            </div>
            <div style={{ marginTop: '20px' }}>
              <label>
                Studying:
                <input
                  type="text"
                  name="studying"
                  value={formData.studying}
                  onChange={handleChange}
                />
              </label>
            </div>
            <button type="button" onClick={handleSave}>
              Save
            </button>
            <button type="button" onClick={() => setIsEditing(false)}>
              Cancel
            </button>
          </form>
        ) : (
          <>
            <p style={{ marginBottom: '20px' }}>
              <strong>Name:</strong> {formData.username}
            </p>
            <p style={{ marginBottom: '20px' }}>
              <strong>Email:</strong> {formData.email}
            </p>
            <p style={{ marginBottom: '20px' }}>
              <strong>Occupation:</strong> {formData.occupation}
            </p>
            <p style={{ marginBottom: '20px' }}>
              <strong>Studying:</strong> {formData.studying}
            </p>
            <button onClick={() => setIsEditing(true)}>Edit Profile</button>
          </>
        )}
      </div>
    </div>
  );
};

export default ViewProfile;