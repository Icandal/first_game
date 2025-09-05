import React from 'react';
import './Asteroid.css';

const Asteroid = ({ position }) => {
    return (
        <div
            className="Asteroid"
            style={{
                top: position.y,
                left: position.x,
            }}
        >
        </div>
    );
};

export default Asteroid;
