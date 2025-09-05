import React from 'react';
import './game_over_page.css';

const GameOver = ({ onRestart }) => {
    return (
        <div className='game-over'>
            <button className='restart-button' onClick={onRestart}>Restart</button>
        </div>
    );
};

export default GameOver;