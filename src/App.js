import React, { useState, useEffect } from 'react';
import './App.css';

import Stopwatch from './components/Stopwatch';
import Timer from './components/Timer';

const App = () => {
  const [activeTab, setActiveTab] = useState('stopwatch'); 

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    const storedTab = localStorage.getItem('activeTab');
    if (storedTab) {
      setActiveTab(storedTab);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('activeTab', activeTab);
  }, [activeTab]);

  return (
    <div className="App">
      <nav className="navbar">
        <ul>
          <li className={activeTab === 'stopwatch' ? 'active' : ''}>
            <button onClick={() => handleTabChange('stopwatch')}>Stopwatch</button>
          </li>
          <li className={activeTab === 'timer' ? 'active' : ''}>
            <button onClick={() => handleTabChange('timer')}>Timer</button>
          </li>
        </ul>
      </nav>
      <div className="content">
        {activeTab === 'stopwatch' && <Stopwatch />}
        {activeTab === 'timer' && <Timer />}
      </div>
    </div>
  );
};

export default App;
