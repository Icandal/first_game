// components/TouchControls/TouchControls.js
import React from 'react';
import './TouchControls.css';

const TouchControls = ({ onMove }) => {
    return (
        <div className="touch-controls">
            <div className="controls-row">
                <button 
                    className="control-btn up"
                    onTouchStart={() => onMove('up')}
                    aria-label="Move up"
                >↑</button>
            </div>
            <div className="controls-row">
                <button 
                    className="control-btn left"
                    onTouchStart={() => onMove('left')}
                    aria-label="Move left"
                >←</button>
                <button 
                    className="control-btn right"
                    onTouchStart={() => onMove('right')}
                    aria-label="Move right"
                >→</button>
            </div>
            <div className="controls-row">
                <button 
                    className="control-btn down"
                    onTouchStart={() => onMove('down')}
                    aria-label="Move down"
                >↓</button>
            </div>
        </div>
    );
};

export default TouchControls;