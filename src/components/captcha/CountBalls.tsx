import './CountBalls.css'
import { useState, useEffect, useRef } from 'react';

interface Props {
    setSuccess: (val: boolean) => void;
    setP: (paragraph: string) => void;
    setL: (paragraph: string) => void;
}

const ballCount = Math.floor(Math.random() * (14 - 8 + 1) + 8);

function CountBalls(props: Props) {
    const [count, setCount] = useState(0);
    const [balls, setBalls] = useState<any[]>([]);
    const trackRef = useRef<HTMLDivElement>(null);

    props.setP("Count the number of ");
    props.setL("Balls");

    const incrementCount = () => {
        setCount((prevCount) => {
            const newCount = prevCount + 1;
            if (newCount === ballCount) {
                props.setSuccess(true);
            }
            return newCount;
        });
    };

    const decrementCount = () => {
        setCount((prevCount) => {
            const newCount = prevCount - 1;
            if (newCount === ballCount) {
                props.setSuccess(true);
            }
            return newCount;
        });
    };

    useEffect(() => {
        const newBalls = Array.from({ length: ballCount }).map(() => ({
            x: Math.random() * 300,
            y: Math.random() * 300,
            velocityX: (Math.random() - 0.5) * 2,
            velocityY: (Math.random() - 0.5) * 2,
        }));
        setBalls(newBalls);

        const interval = setInterval(() => {
            setBalls((prevBalls) =>
                prevBalls.map((ball) => {
                    if (trackRef.current) {
                        const trackWidth = trackRef.current.offsetWidth;
                        const trackHeight = trackRef.current.offsetHeight;

                        let newX = ball.x + ball.velocityX;
                        let newY = ball.y + ball.velocityY;

                        if (newX < 0 || newX > trackWidth - 30) {
                            ball.velocityX = -ball.velocityX;
                        }

                        if (newY < 0 || newY > trackHeight - 30) {
                            ball.velocityY = -ball.velocityY;
                        }

                        // Boundary
                        newX = Math.max(0, Math.min(trackWidth - 30, newX));
                        newY = Math.max(0, Math.min(trackHeight - 30, newY));

                        return {
                            ...ball,
                            x: newX,
                            y: newY,
                        };
                    }
                    return ball;
                })
            );
        }, 16);

        return () => clearInterval(interval);
    }, [ballCount]);

    return (
        <div className="count-balls">
            <div className="track" ref={trackRef}>
                {balls.map((ball, index) => (
                    <div
                        key={index}
                        className="ball"
                        style={{
                            left: `${ball.x}px`,
                            top: `${ball.y}px`,
                        }}
                    />
                ))}
            </div>

            <div className="counter">
                <button onClick={decrementCount}>←</button>
                <div className="current">
                    {count}
                </div>
                <button onClick={incrementCount}>→</button>
            </div>
        </div>
    );
}

export default CountBalls;