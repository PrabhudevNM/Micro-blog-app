import React, { useState, useEffect } from 'react';
import { Button, Card, Image, Alert, Form, Spinner } from 'react-bootstrap';
import axios from '../config/axios';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [formData, setFormData] = useState({ username: '', email: '', file: null });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  // Fetch profile details
  const fetchProfile = async () => {
    try {
      const response = await axios.get('/api/users-profile', {headers:{'Authorization':localStorage.getItem('token')}});
      setProfile(response.data);
    } catch (err) {
      if (err.response?.status === 404) {
        setProfile(null); // No profile found
      } else {
        setError('Failed to load profile.');
      }
    }
  };

  // Handle form field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError(null);
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });
    setError(null);
  };

  // Create or update the profile
  const saveProfile = async (e) => {
    e.preventDefault();

    const formPayload = new FormData();
    formPayload.append('username', formData.username);
    formPayload.append('email', formData.email);
    if (formData.file) {
      formPayload.append('file', formData.file);
    }

    try {
      setLoading(true);
      const url = profile
        ? `/api/users-profile/${profile._id}` // Update profile
        : '/api/users-profile'; // Create profile
      const method = profile ? 'put' : 'post';

      const response = await axios[method](url, formPayload, {headers:{'Authorization':localStorage.getItem('token')}});

      setProfile(response.data);
      setIsEditMode(false);
      alert(profile ? 'Profile updated successfully!' : 'Profile created successfully!');
    } catch (err) {
      console.error('Error saving profile:', err);
      setError('Failed to save profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle delete profile
  const deleteProfile = async () => {
    const confirmed = window.confirm('Are you sure you want to delete your profile?');
    if (!confirmed) return;

    try {
      setLoading(true);
      await axios.delete(`/api/users-profile/${profile._id}`, {headers:{'Authorization':localStorage.getItem('token')}});
      alert('Profile deleted successfully.');
      setProfile(null);
    } catch (err) {
      console.error('Error deleting profile:', err);
      setError('Failed to delete profile.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      {error && <Alert variant="danger">{error}</Alert>}

      {profile ? (
        // Profile exists
        <Card>
          <Card.Body className="text-center">
            <Image
              src={profile.file || 'https://via.placeholder.com/150'}
              roundedCircle
              width={150}
              height={150}
              alt="Profile"
              className="mb-3"
              style={{ objectFit: 'cover', boxShadow: '0 0 10px rgba(0,0,0,0.2)' }}
            />
            <h4>{profile.username}</h4>
            <p>{profile.email}</p>
            <Button
              variant="primary"
              onClick={() => setIsEditMode(true)}
              className="me-2"
              disabled={loading}
            >
              Update Profile
            </Button>
            <Button variant="danger" onClick={deleteProfile} disabled={loading}>
              Delete Profile
            </Button>
          </Card.Body>
        </Card>
      ) : (
        // No profile found
        <div className="text-center">
          <p>No profile found. Please create one.</p>
        </div>
      )}

      {(isEditMode || !profile) && (
        // Profile form for create/update
        <Card className="mt-4">
          <Card.Body>
            <Form onSubmit={saveProfile}>
              <Form.Group controlId="username" className="mb-3">
                <Form.Label>Enter Your Bio</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Your Bio"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  required
                  style={{ maxWidth: '300px' }}
                />
              </Form.Group>

              <Form.Group controlId="email" className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Profile Picture</Form.Label>
                <Form.Control type="file" onChange={handleFileChange} />
              </Form.Group>

              <Button variant="success" type="submit" disabled={loading}>
                {loading ? 'Saving...' : profile ? 'Update Profile' : 'Create Profile'}
              </Button>
              {profile && (
                <Button
                  variant="secondary"
                  className="ms-2"
                  onClick={() => setIsEditMode(false)}
                  disabled={loading}
                >
                  Cancel
                </Button>
              )}
            </Form>
          </Card.Body>
        </Card>
      )}

      {loading && (
        <div className="text-center mt-3">
          <Spinner animation="border" />
        </div>
      )}
    </div>
  );
};

export default Profile;
