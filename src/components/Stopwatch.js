import React, { useState, useEffect } from 'react';
import './styles/Stopwatch.css';

const Stopwatch = () => {
    const [time, setTime] = useState(0);
    const [running, setRunning] = useState(false);

    useEffect(() => {
        let interval = null;
        if (running) {
            interval = setInterval(() => {
                setTime(prevTime => prevTime + 10);
            }, 10);
        } else {
            clearInterval(interval);
        }

        return () => clearInterval(interval);
    }, [running]);

    const handleStart = () => {
        setRunning(true);
    };

    const handlePause = () => {
        setRunning(false);
    };

    const handleReset = () => {
        setTime(0);
        setRunning(false);
    };

    const formatTime = (time) => {
        const ms = (`00${time % 1000}`).slice(-3);
        const seconds = (`0${Math.floor((time / 1000) % 60)}`).slice(-2);
        const minutes = (`0${Math.floor((time / 60000) % 60)}`).slice(-2);
        const hours = (`0${Math.floor((time / 3600000) % 24)}`).slice(-2);
        return `${hours} : ${minutes} : ${seconds} : ${ms}`;
    };

    return (
        <div className="stopwatch-container">
            <h2>Stopwatch</h2>
            <div className="stopwatch-display">
                {formatTime(time)}
            </div>
            <div className="buttons">
                {!running ?
                    <button onClick={handleStart}>Start</button>
                    :
                    <button onClick={handlePause}>Pause</button>
                }
                <button onClick={handleReset}>Reset</button>
            </div>
        </div>
    );
};

export default Stopwatch;
