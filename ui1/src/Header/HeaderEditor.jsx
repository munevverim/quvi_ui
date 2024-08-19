import React, { useEffect, useState } from 'react';
import styles from './HeaderEditor.module.css';
import logo from '../assets/quviLogo.png';
import { Link } from 'react-router-dom';
import coin from '../assets/quviCoin.png';
import DownloadButton from '../DownloadButton/DownloadButton';

function HeaderEditor({ showDownloadButton, onDownload }) {
  // State to store user data
  const [userData, setUserData] = useState({
    coinValue: 0,
    username: '',
  });

  // Fetch user data from backend
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/userInfo'); // Backend API URL
        const data = await response.json();
        
        // Set the user data into state
        setUserData({
          coinValue: data.coinValue,
          username: data.username,
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <>
      <header className={styles.headerEditor}>
        <Link to="/">
          <button className={styles.logo}>
            <img className={styles.logoImage} src={logo} alt="Logo" />
          </button>
        </Link>
        <div className={styles.headerRight}>
          {showDownloadButton && <DownloadButton onDownload={onDownload} />}
          <div className={styles.HeaderProfile}>
            <div className={styles.userValues}>
              <img className={styles.coinImage} src={coin} alt="Coin" />
              <p className={styles.coinValue}>{userData.coinValue}</p>
            </div>
            <div className={styles.userProfile}>{userData.username.charAt(0).toUpperCase()}</div>
          </div>
        </div>
      </header>
      <hr />
    </>
  );
}

export default HeaderEditor;
