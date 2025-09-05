import { useState, useEffect } from 'react';
import './CongratsComponent.css';

const CongratsComponent = ({ onRestart }) => {
  const [confettiElements, setConfettiElements] = useState([]);

  useEffect(() => {
    const elements = [];
    const totalConfetti = 50;
    
    for (let i = 0; i < totalConfetti; i++) {
      setTimeout(() => {
        elements.push({
          id: i,
          left: `${Math.random() * 100}vw`,
          delay: `${Math.random() * 0.5}s`,
          color: `hsl(${Math.random() * 360}, 100%, 50%)`,
          duration: `${Math.random() * 2 + 3}s`,
          size: `${Math.random() * 8 + 4}px`,
          rotation: Math.random() * 360
        });
        
        if (elements.length === totalConfetti) {
          setConfettiElements([...elements]);
        }
      }, i * 50); 
    }
  }, []);

  return (
    <div className="congrats-container">
      <div className="congrats-overlay">
        <div className="congrats-content">
          <h2 className="congrats-text">Congratulations! You Win! 🎉</h2>
          <button 
            className="reset-button"
            onClick={onRestart}
          >
            Play Again
          </button>
        </div>
      </div>
      
      {confettiElements.map((confetti) => (
        <div 
          key={confetti.id}
          className="confetti"
          style={{
            left: confetti.left,
            animationDelay: confetti.delay,
            backgroundColor: confetti.color,
            animationDuration: confetti.duration,
            width: confetti.size,
            height: confetti.size,
            transform: `rotate(${confetti.rotation}deg)`
          }}
        />
      ))}
    </div>
  );
};

export default CongratsComponent;