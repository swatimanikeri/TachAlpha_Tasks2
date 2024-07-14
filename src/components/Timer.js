import React, { useState, useEffect } from 'react';
import './styles/Timer.css';

const Timer = () => {
    const [targetDate, setTargetDate] = useState('');
    const [timeRemaining, setTimeRemaining] = useState('');
    const [timerRunning, setTimerRunning] = useState(false);

    useEffect(() => {
        let interval = null;
        
        if (timerRunning && targetDate) {
            interval = setInterval(() => {
                const now = new Date().getTime();
                const distance = targetDate - now;

                if (distance <= 0) {
                    clearInterval(interval);
                    setTimerRunning(false);
                    setTimeRemaining('Timer expired');
                } else {
                    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

                    setTimeRemaining(`${days}D ${hours}H ${minutes}M ${seconds}S`);
                }
            }, 1000);
        } else {
            clearInterval(interval);
        }

        return () => clearInterval(interval);
    }, [timerRunning, targetDate]);

    const handleStartTimer = () => {
        if (targetDate && !timerRunning) {
            setTimerRunning(true);
        }
    };

    const handlePauseTimer = () => {
        setTimerRunning(false);
    };

    const handleResetTimer = () => {
        setTargetDate('');
        setTimeRemaining('');
        setTimerRunning(false);
    };

    const handleDateChange = (event) => {
        setTargetDate(new Date(event.target.value).getTime());
    };

    return (
        <div className="timer-container">
            <h2>Timer</h2>
            <div className="input-fields">
                <label>Select Date and Time:</label>
                <input type="datetime-local" value={targetDate ? new Date(targetDate).toISOString().slice(0, -1) : ''} onChange={handleDateChange} />
            </div>
            <div className="timer-display">
                {timeRemaining}
            </div>
            <div className="buttons">
                {!timerRunning ?
                    <button onClick={handleStartTimer} disabled={!targetDate}>Start</button>
                    :
                    <button onClick={handlePauseTimer}>Pause</button>
                }
                <button onClick={handleResetTimer}>Reset</button>
            </div>
        </div>
    );
};

export default Timer;
