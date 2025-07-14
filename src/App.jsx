import './App.css';
import React, { useState, useEffect } from 'react';
import LoadingScreen from './pages/loadingscreen';
import Game from './pages/game';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading ? <LoadingScreen /> : <Game />}
    </>
  );
}

export default App;
