import React, { useState, useEffect, useRef } from 'react';
import Asteroid from './components/Asteroid/Asteroid';
import Rocket from './components/Rocket/Rocket';
import GameOver from './components/Game_Over/Game_over';
import './App.css';
import Score from './components/Score/Score';
import CongratsComponent from './components/CongratsComponent/CongratsComponent.js';
import TouchControls from './components/TouchControls/TouchControls'; // Новый компонент для сенсорного управления

const App = () => {
    const [isFailed, setFail] = useState(false);
    const [PositionOfRocket, setPositionOfRocket] = useState({ x: 250, y: 50 });
    const [scrollOffset, setScrollOffset] = useState(0);
    const [positionOfAsteroids, setPositionOfAsteroids] = useState([{x: 0, y: 0}])
    const [showCongrats, setShowCongrats] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const touchStartRef = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const checkMobile = () => {
            return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        };
        setIsMobile(checkMobile());
    }, []);

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

    const moveRocket = (direction) => {
        const step = 10; // Увеличим шаг для touch управления

        switch (direction) {
            case 'up':
                setPositionOfRocket((prev) => {
                    const newY = Math.max(5, prev.y - step);
                    return { ...prev, y: newY };
                });
                break;
            case 'down':
                setPositionOfRocket((prev) => {
                    const newY = Math.min(2395, prev.y + step);
                    return { ...prev, y: newY };
                });
                break;
            case 'left':
                setPositionOfRocket((prev) => {
                    const newX = Math.max(5, prev.x - step);
                    return { ...prev, x: newX };
                });
                break;
            case 'right':
                setPositionOfRocket((prev) => {
                    const newX = Math.min(395, prev.x + step);
                    return { ...prev, x: newX };
                });
                break;
            default:
                break;
        }
    };

    const handleKeyDown = (e) => {
        e.preventDefault();
        
        switch (e.key) {
            case 'ArrowUp':
                moveRocket('up');
                break;
            case 'ArrowDown':
                moveRocket('down');
                break;
            case 'ArrowLeft':
                moveRocket('left');
                break;
            case 'ArrowRight':
                moveRocket('right');
                break;
            default:
                break;
        }
    };

    // Обработчик сенсорного управления
    const handleTouchStart = (e) => {
        touchStartRef.current = {
            x: e.touches[0].clientX,
            y: e.touches[0].clientY
        };
    };

    const handleTouchMove = (e) => {
        e.preventDefault();
        if (!touchStartRef.current) return;

        const touch = e.touches[0];
        const deltaX = touch.clientX - touchStartRef.current.x;
        const deltaY = touch.clientY - touchStartRef.current.y;

        // Определяем направление свайпа
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
            // Горизонтальный свайп
            if (deltaX > 30) moveRocket('right');
            else if (deltaX < -30) moveRocket('left');
        } else {
            // Вертикальный свайп
            if (deltaY > 30) moveRocket('down');
            else if (deltaY < -30) moveRocket('up');
        }

        // Обновляем начальную позицию для плавного управления
        touchStartRef.current = {
            x: touch.clientX,
            y: touch.clientY
        };
    };

    // Простое управление кнопками для мобильных
    const handleButtonPress = (direction) => {
        moveRocket(direction);
    };

    useEffect(() => {
        generateCoards();
    }, []);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        
        // Добавляем обработчики для touch устройств
        if (isMobile) {
            window.addEventListener('touchstart', handleTouchStart);
            window.addEventListener('touchmove', handleTouchMove, { passive: false });
        }

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            if (isMobile) {
                window.removeEventListener('touchstart', handleTouchStart);
                window.removeEventListener('touchmove', handleTouchMove);
            }
        };
    }, [isMobile]);

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
        <div 
            className="game-container"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
        >
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
                    
                    {/* Сенсорные кнопки управления для мобильных */}
                    {isMobile && (
                        <div className="touch-controls">
                            <div className="controls-row">
                                <button 
                                    className="control-btn up"
                                    onTouchStart={() => handleButtonPress('up')}
                                >↑</button>
                            </div>
                            <div className="controls-row">
                                <button 
                                    className="control-btn left"
                                    onTouchStart={() => handleButtonPress('left')}
                                >←</button>
                                <button 
                                    className="control-btn right"
                                    onTouchStart={() => handleButtonPress('right')}
                                >→</button>
                            </div>
                            <div className="controls-row">
                                <button 
                                    className="control-btn down"
                                    onTouchStart={() => handleButtonPress('down')}
                                >↓</button>
                            </div>
                        </div>
                    )}
                    
                    {showCongrats && <CongratsComponent onRestart={handleRestart}/>}
                </>)
                :
                (<GameOver onRestart={handleRestart}/>)
            }
        </div>
    );
};

export default App;