import React from 'react';
import './Rocket.css'

const Rocket = ({ position, onMove }) => {
    return (
        <div
    className="Rocket"
    style={{
        top: position.y,
        left: position.x,
    }}
    onKeyDown={onMove}
>
</div>
    );
};

export default Rocket;
