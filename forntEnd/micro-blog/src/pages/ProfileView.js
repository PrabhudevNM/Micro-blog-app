import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "../config/axios";
import "./ProfileView.css";

export default function ProfileView() {
  const { userId } = useParams(); // Get the userId from the route
  const [profile, setProfile] = useState(null);
  // const profileimg=`http://localhost:8080/${profile.file.replace(/\\/g, '/')}`

  useEffect(() => {
    // Fetch the profile data when the component mounts
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`/api/users-profile`, {
          headers: { 'Authorization': localStorage.getItem('token') }
        });
        if(response){
          console.log(response.data)
        }
        // console.log(response.data.user)
        setProfile(response.data); // Assume response data contains the profile info
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, [userId]);

  if (!profile) return <div>Loading...</div>;

  return (
    <div className="profile-view-container">
      <div className="profile-view-card">
        <img
           src={`http://localhost:8080${profile.file}`}  // Assuming the backend returns the image URL
          alt={`${profile.username}'s profile`}
          className="profile-pic"
        />
        <h2 className="username">Username:{profile.username}</h2>
        <p className="bio">Bio:{profile.bio}</p>
      </div>
    </div>
  );
}
