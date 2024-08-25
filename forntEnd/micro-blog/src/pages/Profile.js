import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../config/axios";
import "./Profile.css";

export default function CreateProfile() {
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("username", username);
    formData.append("bio", bio);
    if (profilePic) {
      formData.append("file", profilePic);
    }

    try {
      const response = await axios.post('/api/users-profile', formData, {headers:{'Authorization':localStorage.getItem('token')}})
      console.log(response.data)
      if (response) {
        // Assume response includes user ID or profile data
        const userId = response.data.userId; // Adjust based on your backend response
        navigate(`/profile-view/${userId}`); // Redirect to ProfileView with userId
      } else {
        throw new Error("Failed to create profile");
      }
    } catch (error) {
      console.error("Error creating profile:", error);
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2>Create Profile</h2>
        <form onSubmit={handleSubmit} className="profile-form">
          <div className="form-group">
            <label>Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Bio:</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Profile Picture:</label>
            <input
              type="file"
              onChange={(e) => setProfilePic(e.target.files[0])}
            />
          </div>
          <button type="submit" className="save-btn">Create Profile</button>
        </form>
      </div>
    </div>
  );
}
