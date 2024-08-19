import React, { useEffect, useState } from 'react';

const Home = () => {
  const [userData, setUserData] = useState(null);
  const [csrfToken, setCsrfToken] = useState('');

  const handleLogin = () => {
    window.location.href = 'http://127.0.0.1:8000/social-auth/login/google-oauth2/';
  };

  // Fetch CSRF token
  const fetchCsrfToken = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/csrf/', {
        method: 'GET',
        credentials: 'include', // Tarayıcıdaki oturum bilgilerini dahil et
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setCsrfToken(data.csrfToken);
    } catch (error) {
      console.error('Error fetching CSRF token:', error);
    }
  };

  // Fetch user data
  const fetchUserData = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/userInfo/', {
        method: 'GET',
        credentials: 'include', 
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrfToken, // CSRF token'ı başlığa ekleyin
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setUserData(data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    // İlk olarak CSRF token'ı al
    fetchCsrfToken().then(() => {
      // CSRF token'ı aldıktan sonra kullanıcı verilerini al
      fetchUserData();
    });
  }, []);

  return (
    <div>
      <button onClick={handleLogin}>Login with Google</button>
      {userData ? (
        <div>
          <h2>Welcome, {userData.username}!</h2>
          <p>Email: {userData.email}</p>
          <p>First Name: {userData.first_name}</p>
          <p>Last Name: {userData.last_name}</p>
        </div>
      ) : (
        <p>Please log in to see your details.</p>
      )}
    </div>
  );
};

export default Home;
