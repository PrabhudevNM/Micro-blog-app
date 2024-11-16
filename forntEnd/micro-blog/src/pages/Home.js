import React, { useState, useEffect } from 'react';
import axios from '../config/axios'; // Adjust the path as necessary
import './Home.css'

const Home = () => {
  const [posts, setPosts] = useState([]);

  // Fetch posts on component mount
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('/api/users-posts', {headers:{'Authorization':localStorage.getItem('token')}})
        console.log(response.data)
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="home">
      <h3>All Posts</h3>
      {posts.length > 0 ? (
        posts.map((post) => (
          <div key={post._id} className="post">
            {/* <h2>{post.title}</h2> */}
            <p>{post.body}</p>
            {post.file && <img src={post.file} alt="post"/>} {/* Adjust based on your backend response */}
            <p>likes-{post.likes}</p>
            <p>comments-{post.comments}</p>
          </div>
        ))
      ) : (
        <p>No posts available</p>
      )}
    </div>
  );
};

export default Home;
