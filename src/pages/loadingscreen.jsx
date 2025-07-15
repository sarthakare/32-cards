import React, { useEffect, useState } from 'react';
import '../styles/loadingscreen.css';
import vr32Cards from '../assets/images/loading_Screen.png';

function LoadingScreen() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval;
    let start = Date.now();
    interval = setInterval(() => {
      const elapsed = Date.now() - start;
      const percent = Math.min((elapsed / 5000) * 100, 100);
      setProgress(percent);
      if (percent >= 100) {
        clearInterval(interval);
      }
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="loading-screen">
      <img src={vr32Cards} alt="Loading" className="loading-image" />
      <div className="progress-bar-container">
        <div className="progress-bar" style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}

export default LoadingScreen;
