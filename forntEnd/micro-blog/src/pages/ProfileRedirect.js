import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../config/axios";

export default function ProfileRedirect() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUserProfile = async () => {
      try {
        const response = await axios.get('/api/users-profile/check', {
          headers: { 'Authorization': localStorage.getItem('token') }
        });
        console.log(response.data)
        if (response.data.profileExists) {
          // Redirect to ProfileView with the existing profile ID
          navigate(`/profile-view/${response.data.profileId}`);
        } else {
          // Redirect to CreateProfile if no profile exists
          navigate('/create-profile');
        }
      } catch (error) {
        console.error("Error checking profile existence:", error);
      } finally {
        setLoading(false);
      }
    };

    checkUserProfile();
  }, [navigate]);

  if (loading) return <div>Loading...</div>;

  return null; // This component only handles redirection, so no UI is needed
}
