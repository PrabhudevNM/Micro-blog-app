  import React, { useState } from 'react';
  import axios from '../config/axios';
  import { toast } from 'react-toastify';
  import {  useNavigate } from 'react-router-dom';
  const AddPost = () => {
    const navigate = useNavigate()
    const [post, setPost] = useState({
      body: '',
      keyword: '',
      file: null,
    });

    const handleChange = (e) => {
      const { name, value } = e.target;
      setPost((prevPost) => ({
        ...prevPost,
        [name]: value,
      }));
    };

    const handleFileChange = (e) => {
      setPost((prevPost) => ({
        ...prevPost,
        file: e.target.files[0],
      }));
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
    
      // Create a FormData object to handle the file upload
      const formData = new FormData();
      formData.append('body', post.body);
      formData.append('keyword', post.keyword);
      formData.append('file', post.file);
    
      try {
        const response = await axios.post('/api/users-posts', formData,{headers:{'Authorization':localStorage.getItem('token')}})
        toast('Post created successfully', { autoClose: 2000 })
        navigate('/');

        console.log(response.data)
        if (response.ok) {
          // Handle successful submission
          const result = await response.json();
          console.log('Post submitted successfully:', result);

          // Reset form or show success message
          setPost({
            body: '',
            keyword: '',
            file: null,
          });
        } else {
          // Handle errors
          const error = await response.json();
          console.error('Error submitting post:', error.message);
        }
      } catch (error) {
        console.error('Network error:', error);
      }
    };
    
    return (
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '400px', margin: 'auto' }}>
        <textarea
          name="body"
          value={post.body}
          onChange={handleChange}
          placeholder="Enter post body"
          rows="4"
          style={{ padding: '10px', fontSize: '16px' }}
          required
        />
        
        <input
          type="text"
          name="keyword"
          value={post.keyword}
          onChange={handleChange}
          placeholder="Enter keyword"
          style={{ padding: '10px', fontSize: '16px' }}
          required
        />

        <input
          type="file"
          name="file"
          onChange={handleFileChange}
          style={{ padding: '10px' }}
          required
        />

        <button type="submit" style={{ padding: '10px', fontSize: '16px', cursor: 'pointer' }}>
          Submit Post
        </button>
      </form>
    );
  };

  export default AddPost;
