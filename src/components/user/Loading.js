import React from 'react';

const Loading = ({ message = "Loading..." }) => {
  return (
    <div style={styles.overlay}>
      <div style={styles.container}>
        <img
          src="../../img/Eggtimer.png" // ✅ your loading image here
          alt="Loading"
          style={styles.spinner}
        />
        <p style={styles.message}>{message}</p>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(255,255,255,0.8)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  spinner: {
    width: 60,
    height: 60,
    animation: 'spin 1s linear infinite',
  },
   message: {
    marginTop: 30,
    fontSize: 18,
    color: '#2262A5',
    fontWeight: 'bold',
    fontFamily: 'Lato'
  }
};

export default Loading;