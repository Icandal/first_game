import React, { useState, useEffect } from 'react';
import Asteroid from './components/Asteroid/Asteroid';
import Rocket from './components/Rocket/Rocket';
import GameOver from './components/Game_Over/Game_over';
import './App.css';
import Score from './components/Score/Score';
import CongratsComponent from './components/CongratsComponent/CongratsComponent.js';

const App = () => {
    const [isFailed, setFail] = useState(false);
    const [PositionOfRocket, setPositionOfRocket] = useState({ x: 250, y: 50 });
    const [scrollOffset, setScrollOffset] = useState(0);
    const [positionOfAsteroids, setPositionOfAsteroids] = useState([{x: 0, y: 0}])
    const [showCongrats, setShowCongrats] = useState(false);

    const generateCoards = () => {
        const numberOfAsteroids = 5;
        const yDist = 400;
        const xDist = 300;
        const asteroids = [];

        for (let i=0; i<numberOfAsteroids; i++) {
            const x = Math.floor(Math.random() * xDist);
            const y = i*yDist + 500;
            asteroids.push({x, y});
        }
        setPositionOfAsteroids(asteroids);
    };

    const handleKeyDown = (e) => {
        e.preventDefault();
        const step = 5;

        switch (e.key) {
            case 'ArrowUp':
                setPositionOfRocket((prev) => {
                    const newY = Math.max(5, prev.y - step);
                    return { ...prev, y: newY };
                });
                break;
            case 'ArrowDown':
                setPositionOfRocket((prev) => {
                    const newY = Math.min(2395, prev.y + step);
                    return { ...prev, y: newY };
                });
                break;
            case 'ArrowLeft':
                setPositionOfRocket((prev) => {
                    const newX = Math.max(5, prev.x - step);
                    return { ...prev, x: newX };
                });
                break;
            case 'ArrowRight':
                setPositionOfRocket((prev) => {
                    const newX = Math.min(395, prev.x + step);
                    return { ...prev, x: newX };
                });
                break;
            default:
                break;
        }
    };

    useEffect(() => {
        generateCoards();
    }, []);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    useEffect(() => {
        const checkPosition = (PositionOfRocket, positionOfAsteroids) => {
            const asteroids = Object.values(positionOfAsteroids);
            return asteroids.some((asteroid) => (
                PositionOfRocket.x < asteroid.x + 101 &&
                PositionOfRocket.x + 101 > asteroid.x &&
                PositionOfRocket.y < asteroid.y + 101 &&
                PositionOfRocket.y + 101 > asteroid.y
            ));
        };

        if (checkPosition(PositionOfRocket, positionOfAsteroids)) {
            setFail(true);
        }
    }, [PositionOfRocket, positionOfAsteroids]);

    const handleRestart = () => {
        window.location.reload();
    };

    useEffect(() => {
        const interval = setInterval(() => {
            if (PositionOfRocket.y < 2500) {
                setPositionOfRocket((prev) => ({ ...prev, y: Math.min(2500, prev.y + 0.5) }));
            }
        }, 5);
    
        return () => clearInterval(interval);
    }, [PositionOfRocket.y]);

    useEffect(() => {
        if (PositionOfRocket.y < 2350) {
            setScrollOffset(PositionOfRocket.y - 50);
        } else {
            setShowCongrats(true);
        }
    }, [PositionOfRocket.y]);

    return (
        <div>
            {!isFailed ? 
                (<>
                    <div 
                        className='container' 
                        style={{ transform: `translateY(-${scrollOffset}px)` }}
                    >
                        {positionOfAsteroids.map((asteroid, index) => (
                            <Asteroid key={index}
                            position={{x: asteroid.x, y: asteroid.y}}
                            />
                        ))}
                        <Rocket position={{ x: PositionOfRocket.x, y: PositionOfRocket.y }} />
                    </div>
                    <Score rocketPosition={PositionOfRocket}/>
                    {showCongrats && <CongratsComponent onRestart={handleRestart}/>}
                </>)
                :
                (<GameOver onRestart={handleRestart}/>)
            }
        </div>
    );
};

export default App;