import { useContext } from 'react'
import AuthContext from '../context/AuthContext'

import React from 'react';

const Dashboard = ({ userEmail }) => {
    const { state } = useContext(AuthContext)
    if(!state.user) {
        return <p>loading...</p>
    }
  return (
    
    <div style={styles.container}>
      <header style={styles.header}>
        <div style={styles.logoContainer}>
          <img src="/mini-blog-img.jpeg" alt="Microblog Logo" style={styles.logo} />
          <h1 style={styles.title}>MicroBlog</h1>
        </div>
        <div style={styles.userInfo}>
          <p style={styles.userEmail}>Logged in as: {userEmail}</p>
        </div>
      </header>
      <main style={styles.main}>
      <h3> { state.user.email } </h3>
        <h2>Welcome to your Dashboard</h2>
        {/* Additional dashboard content goes here */}
      </main>
    </div>
    
  );
};

// Inline styles for the component
const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    margin: '20px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    backgroundColor: '#f8f8f8',
    borderBottom: '1px solid #ddd',
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  logo: {
    width: '100px',
    height: '100px',
    marginRight: 'px',
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
  },
  userInfo: {
    textAlign: 'right',
  },
  userEmail: {
    fontSize: '16px',
    color: '#333',
  },
  main: {
    marginTop: '20px',
    padding: '20px',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
};

export default Dashboard;
