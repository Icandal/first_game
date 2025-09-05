import React, { useState, useEffect } from 'react';
import './Score.css';

const Score = ({ rocketPosition }) => {
    const [score, setScore] = useState(0);

    useEffect(() => {
        if (rocketPosition && typeof rocketPosition.y === 'number') {
            const newScore = Math.floor(rocketPosition.y / 10);
            setScore(newScore);
        }
    }, [rocketPosition]);

    return (
        <div className='Score'>Score: {score}</div>
    );
};

export default Score;